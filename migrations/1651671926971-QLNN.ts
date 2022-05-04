import {MigrationInterface, QueryRunner} from "typeorm";

export class QLNN1651671926971 implements MigrationInterface {
    name = 'QLNN1651671926971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`don_dat_phongs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ten_khach_hang\` varchar(255) NOT NULL, \`so_cmt\` int NOT NULL, \`phone\` varchar(255) NOT NULL, \`check_in\` date NOT NULL, \`check_out\` date NOT NULL, \`cost\` int NOT NULL, \`status\` tinyint NOT NULL DEFAULT '0', \`note\` text NOT NULL, \`phongId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`phongs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`status\` enum ('0', '1', '2') NOT NULL DEFAULT '0', \`image\` varchar(255) NOT NULL, \`detail\` text NOT NULL, \`loaiPhongId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`loai_phongs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`cost\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`phone\` varchar(12) NOT NULL, \`role\` enum ('0', '1') NOT NULL DEFAULT '0', \`status\` tinyint NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`don_dat_phongs\` ADD CONSTRAINT \`FK_dad53c41f64a820c53851de1060\` FOREIGN KEY (\`phongId\`) REFERENCES \`phongs\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`phongs\` ADD CONSTRAINT \`FK_339145ac62e13f3cbdab3a5390b\` FOREIGN KEY (\`loaiPhongId\`) REFERENCES \`loai_phongs\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phongs\` DROP FOREIGN KEY \`FK_339145ac62e13f3cbdab3a5390b\``);
        await queryRunner.query(`ALTER TABLE \`don_dat_phongs\` DROP FOREIGN KEY \`FK_dad53c41f64a820c53851de1060\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`loai_phongs\``);
        await queryRunner.query(`DROP TABLE \`phongs\``);
        await queryRunner.query(`DROP TABLE \`don_dat_phongs\``);
    }

}
