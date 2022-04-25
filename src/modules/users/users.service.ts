import { User } from './../../entities/user.entity';
import { UpdateUserDto } from './../../dto/users/update-user.dto';
import { LoginUserDto } from './../../dto/users/login-user.dto';
import { UserI } from './../../interfaces/user.interface';
import { CreateUserDto } from './../../dto/users/create-user.dto';
import { AuthsService } from './../auths/auths.service';
import { UserRepository } from './../../repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authsService: AuthsService,
  ) {}

  getAll(): Observable<UserI[]> {
    return from(this.userRepository.find());
  }

  createUser(createdUserDto: CreateUserDto): Observable<UserI> {
    const userEntity = this.userRepository.create(createdUserDto);

    return this.userNameExists(userEntity.userName).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authsService.hashPassword(userEntity.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              userEntity.password = passwordHash;
              return from(this.userRepository.save(userEntity)).pipe(
                map((savedUser: UserI) => {
                  const { password, ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );
        } else {
          throw new HttpException('UserName already in use!', HttpStatus.CONFLICT);
        }
      }),
    );
  }

  login(loginUserDto: LoginUserDto): Observable<string> {
    return this.findUserByUserName(loginUserDto.userName).pipe(
      switchMap((user: UserI) => {
        if (user) {
          return this.validatePassword(
            loginUserDto.password,
            user.password,
          ).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.findUserById(user.id).pipe(
                  switchMap((user: UserI) =>
                    this.authsService.generateJwt(user),
                  ),
                );
              } else {
                throw new HttpException(
                  'Login was not Successfulll!',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);
    const updateUser = Object.assign(user, dto);

    return await this.userRepository.save(updateUser);
  }

  async deleteUser(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return 'Deleted user!'
  }

  findUserById(id: number): Observable<UserI> {
    return from(this.userRepository.findOne(id));
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<boolean> {
    return this.authsService.comparePasswords(password, storedPasswordHash);
  }

  private findUserByUserName(userName: string): Observable<UserI> {
    return from(
      this.userRepository.findOne(
        { userName },
        { select: ['id', 'userName', 'password', 'name', 'phone', 'role', 'status'] },
      ),
    );
  }

  private userNameExists(userName: string): Observable<boolean> {
    return from(this.userRepository.findOne(userName)).pipe(
      map((user: UserI) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }
}
