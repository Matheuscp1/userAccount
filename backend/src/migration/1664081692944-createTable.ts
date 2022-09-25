import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1664081692944 implements MigrationInterface {
    name = 'createTable1664081692944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`cpf\` varchar(14) NOT NULL, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`index_cpf\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`cpf\` varchar(14) NOT NULL, \`email\` varchar(100) NOT NULL, \`name\` varchar(100) NOT NULL, \`userName\` varchar(100) NOT NULL, \`password\` varchar(60) NOT NULL, UNIQUE INDEX \`index_cpf\` (\`cpf\`), UNIQUE INDEX \`index_email\` (\`email\`), UNIQUE INDEX \`index_user_name\` (\`userName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`zipCode\` varchar(100) NOT NULL, \`publicPlace\` varchar(100) NOT NULL, \`complement\` varchar(100) NOT NULL, \`district\` varchar(100) NOT NULL, \`locality\` varchar(100) NOT NULL, \`uf\` varchar(2) NOT NULL, \`user_account_id\` int NULL, \`client_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`called\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`name\` varchar(100) NOT NULL, \`status\` varchar(100) NOT NULL, \`subject\` varchar(100) NOT NULL, \`complement\` text NOT NULL, \`user_account_id\` int NOT NULL, \`client_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_88a6dbdbe4850060067b17bc831\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_2be82466b35845fdd0d0efcb9f1\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`called\` ADD CONSTRAINT \`FK_bd925d6be5c8a109e1f1449fd8f\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`called\` ADD CONSTRAINT \`FK_0ea2f7d95ccde733938c973c931\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`called\` DROP FOREIGN KEY \`FK_0ea2f7d95ccde733938c973c931\``);
        await queryRunner.query(`ALTER TABLE \`called\` DROP FOREIGN KEY \`FK_bd925d6be5c8a109e1f1449fd8f\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_2be82466b35845fdd0d0efcb9f1\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_88a6dbdbe4850060067b17bc831\``);
        await queryRunner.query(`DROP TABLE \`called\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP INDEX \`index_user_name\` ON \`user_account\``);
        await queryRunner.query(`DROP INDEX \`index_email\` ON \`user_account\``);
        await queryRunner.query(`DROP INDEX \`index_cpf\` ON \`user_account\``);
        await queryRunner.query(`DROP TABLE \`user_account\``);
        await queryRunner.query(`DROP INDEX \`index_cpf\` ON \`client\``);
        await queryRunner.query(`DROP TABLE \`client\``);
    }

}
