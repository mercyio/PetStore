// import { MigrationInterface, QueryRunner } from "typeorm";

// export class TestingFiles1707748381035 implements MigrationInterface {
//     name = 'TestingFiles1707748381035'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`CreatedAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
//     }

// }
