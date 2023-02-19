import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCommunity1676604842201 implements MigrationInterface {
  name = 'createCommunity1676604842201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "communities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fea1fe83c86ccde9d0a089e7ea2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "communities_users_users" ("communitiesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_1c65abaa3302cc4b3e1d36df7e9" PRIMARY KEY ("communitiesId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d296077154293803484deb18d4" ON "communities_users_users" ("communitiesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d16de69681a0eba7049fdd0275" ON "communities_users_users" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "communities_users_users" ADD CONSTRAINT "FK_d296077154293803484deb18d47" FOREIGN KEY ("communitiesId") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "communities_users_users" ADD CONSTRAINT "FK_d16de69681a0eba7049fdd0275f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "communities_users_users" DROP CONSTRAINT "FK_d16de69681a0eba7049fdd0275f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "communities_users_users" DROP CONSTRAINT "FK_d296077154293803484deb18d47"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d16de69681a0eba7049fdd0275"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d296077154293803484deb18d4"`,
    );
    await queryRunner.query(`DROP TABLE "communities_users_users"`);
    await queryRunner.query(`DROP TABLE "communities"`);
  }
}
