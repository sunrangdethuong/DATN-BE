import {MigrationInterface, QueryRunner} from "typeorm";

export class QLNN1651673275345 implements MigrationInterface {
    name = 'QLNN1651673275345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`don_dat_phongs\` CHANGE \`note\` \`note\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`don_dat_phongs\` CHANGE \`note\` \`note\` text NOT NULL`);
    }

}
