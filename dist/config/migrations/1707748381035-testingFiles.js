"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingFiles1707748381035 = void 0;
class TestingFiles1707748381035 {
    constructor() {
        this.name = 'TestingFiles1707748381035';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`CreatedAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }
}
exports.TestingFiles1707748381035 = TestingFiles1707748381035;
//# sourceMappingURL=1707748381035-testingFiles.js.map