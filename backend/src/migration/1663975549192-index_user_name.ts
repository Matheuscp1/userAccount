import {MigrationInterface, QueryRunner} from "typeorm";

export class indexUserName1663975549192 implements MigrationInterface {
    name = 'indexUserName1663975549192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD UNIQUE INDEX \`IDX_e48cd552b61413a5d575a98238\` (\`userName\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`index_user_name\` ON \`user_account\` (\`userName\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`index_user_name\` ON \`user_account\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP INDEX \`IDX_e48cd552b61413a5d575a98238\``);
    }

}
