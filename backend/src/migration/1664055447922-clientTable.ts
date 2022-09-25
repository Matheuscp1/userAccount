import {MigrationInterface, QueryRunner} from "typeorm";

export class clientTable1664055447922 implements MigrationInterface {
    name = 'clientTable1664055447922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e48cd552b61413a5d575a98238\` ON \`user_account\``);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`cpf\` varchar(14) NOT NULL, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`index_cpf\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`client_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_88a6dbdbe4850060067b17bc831\``);
        await queryRunner.query(`ALTER TABLE \`address\` CHANGE \`user_account_id\` \`user_account_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_88a6dbdbe4850060067b17bc831\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_2be82466b35845fdd0d0efcb9f1\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_2be82466b35845fdd0d0efcb9f1\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_88a6dbdbe4850060067b17bc831\``);
        await queryRunner.query(`ALTER TABLE \`address\` CHANGE \`user_account_id\` \`user_account_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_88a6dbdbe4850060067b17bc831\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`client_id\``);
        await queryRunner.query(`DROP INDEX \`index_cpf\` ON \`client\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e48cd552b61413a5d575a98238\` ON \`user_account\` (\`userName\`)`);
    }

}
