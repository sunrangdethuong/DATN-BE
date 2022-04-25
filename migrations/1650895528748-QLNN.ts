import {MigrationInterface, QueryRunner} from "typeorm";

export class QLNN1650895528748 implements MigrationInterface {
    name = 'QLNN1650895528748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phongs\` DROP FOREIGN KEY \`FK_339145ac62e13f3cbdab3a5390b\``);
        await queryRunner.query(`ALTER TABLE \`don_dat_phongs\` ADD \`phongId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`phongs\` ADD CONSTRAINT \`FK_339145ac62e13f3cbdab3a5390b\` FOREIGN KEY (\`loaiPhongId\`) REFERENCES \`loai_phongs\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`don_dat_phongs\` ADD CONSTRAINT \`FK_dad53c41f64a820c53851de1060\` FOREIGN KEY (\`phongId\`) REFERENCES \`phongs\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`don_dat_phongs\` DROP FOREIGN KEY \`FK_dad53c41f64a820c53851de1060\``);
        await queryRunner.query(`ALTER TABLE \`phongs\` DROP FOREIGN KEY \`FK_339145ac62e13f3cbdab3a5390b\``);
        await queryRunner.query(`ALTER TABLE \`don_dat_phongs\` DROP COLUMN \`phongId\``);
        await queryRunner.query(`ALTER TABLE \`phongs\` ADD CONSTRAINT \`FK_339145ac62e13f3cbdab3a5390b\` FOREIGN KEY (\`loaiPhongId\`) REFERENCES \`loai_phongs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
