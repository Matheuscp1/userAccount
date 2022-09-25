import {MigrationInterface, QueryRunner} from "typeorm";

export class calledTable1664067326821 implements MigrationInterface {
    name = 'calledTable1664067326821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_bd925d6be5c8a109e1f1449fd8f\` ON \`called\``);
        await queryRunner.query(`DROP INDEX \`FK_0ea2f7d95ccde733938c973c931\` ON \`called\``);
        await queryRunner.query(`DROP INDEX \`FK_88a6dbdbe4850060067b17bc831\` ON \`address\``);
        await queryRunner.query(`DROP INDEX \`FK_2be82466b35845fdd0d0efcb9f1\` ON \`address\``);
        await queryRunner.query(`ALTER TABLE \`called\` CHANGE \`user_account_id\` \`user_account_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`called\` CHANGE \`client_id\` \`client_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` CHANGE \`user_account_id\` \`user_account_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` CHANGE \`client_id\` \`client_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`called\` ADD CONSTRAINT \`FK_bd925d6be5c8a109e1f1449fd8f\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`called\` ADD CONSTRAINT \`FK_0ea2f7d95ccde733938c973c931\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_88a6dbdbe4850060067b17bc831\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_2be82466b35845fdd0d0efcb9f1\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_2be82466b35845fdd0d0efcb9f1\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_88a6dbdbe4850060067b17bc831\``);
        await queryRunner.query(`ALTER TABLE \`called\` DROP FOREIGN KEY \`FK_0ea2f7d95ccde733938c973c931\``);
        await queryRunner.query(`ALTER TABLE \`called\` DROP FOREIGN KEY \`FK_bd925d6be5c8a109e1f1449fd8f\``);
        await queryRunner.query(`ALTER TABLE \`address\` CHANGE \`client_id\` \`client_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address\` CHANGE \`user_account_id\` \`user_account_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`called\` CHANGE \`client_id\` \`client_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`called\` CHANGE \`user_account_id\` \`user_account_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE INDEX \`FK_2be82466b35845fdd0d0efcb9f1\` ON \`address\` (\`client_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_88a6dbdbe4850060067b17bc831\` ON \`address\` (\`user_account_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_0ea2f7d95ccde733938c973c931\` ON \`called\` (\`client_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_bd925d6be5c8a109e1f1449fd8f\` ON \`called\` (\`user_account_id\`)`);
    }

}
