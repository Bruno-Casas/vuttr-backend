import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class FirstTables1604289272746 implements MigrationInterface {
  async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true
        },
        {
          name: 'username',
          type: 'varchar',
          length: '30',
          isUnique: true,
          isNullable: false
        },
        {
          name: 'email',
          type: 'varchar',
          length: '100',
          isUnique: true
        },
        {
          name: 'password',
          type: 'bytea'
        },
        {
          name: 'active',
          type: 'boolean',
          default: true
        }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: 'tools',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true
        },
        {
          name: 'title',
          type: 'varchar',
          length: '100',
          isUnique: true,
          isNullable: false
        },
        {
          name: 'link',
          type: 'varchar',
          length: '50'
        },
        {
          name: 'description',
          type: 'text'
        },
        {
          name: 'registered_by',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          columnNames: ['registered_by'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'RESTRICT'
        }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: 'tags',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar',
          length: '30',
          isUnique: true,
          isNullable: false
        }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: 'tools_tags',
      columns: [
        {
          name: 'tool_id',
          type: 'integer'
        },
        {
          name: 'tag_id',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          columnNames: ['tool_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'tools',
          onDelete: 'CASCADE'
        },
        {
          columnNames: ['tag_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'tags',
          onDelete: 'CASCADE'
        }
      ]
    }), true)
  }

  async down (queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('Tools')
    queryRunner.dropTable('Tags')
    queryRunner.dropTable('tools_tags')
  }
}
