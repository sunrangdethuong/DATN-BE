import {MigrationInterface, QueryRunner} from "typeorm";

export class QLNN1650886528755 implements MigrationInterface {
    name = 'QLNN1650886528755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phongs\` DROP FOREIGN KEY \`FK_339145ac62e13f3cbdab3a5390b\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('0', '1', '2') NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`phongs\` ADD CONSTRAINT \`FK_339145ac62e13f3cbdab3a5390b\` FOREIGN KEY (\`loaiPhongId\`) REFERENCES \`loai_phongs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phongs\` DROP FOREIGN KEY \`FK_339145ac62e13f3cbdab3a5390b\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('0', '1') NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`phongs\` ADD CONSTRAINT \`FK_339145ac62e13f3cbdab3a5390b\` FOREIGN KEY (\`loaiPhongId\`) REFERENCES \`loai_phongs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
