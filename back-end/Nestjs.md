## Nest 설치 및 프로젝트 생성

```shell
$ npm -g install @nest/cli
$ nest new project_name
```

---

## 엔티티 생성

```js
// /src/entity/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
```

엔티티를 `src/entity` 폴더 내부에 작성하여 전체적인 테이블 구조를 나타내었다.

---

## 데이터베이스 연동

```json
// /ormconfig.json

{
  "type": "mariadb",
  "host": "localhost",
  "port": 3306,
  "username": "username",
  "password": "password",
  "database": "database",
  "entities": ["dist/**/*.entity.js"],
  "synchronize": false
}
```

- `synchronize` 키를 `true` 로 설정하게 되면 작성한 Entity와 Database간의 sync를 맞추게된다.
- 하지만 원하지 않는 시점에 Database 구조가 변경될 수 있기 때문에 sync를 맞추기 위해서는 명령어를 사용하여 맞추는게 좋다.

```shell
$ yarn typeorm schema:sync
```

공식문서를 보다 궁금증이 생겨났다.

```json
{
  (...)
  "entities": "dist/**/*.entity{.ts,.js}"
}
```

Entity를 정의한 폴더 경로로 수정 후 user 테이블을 DROP하고 다시 실행해보았다.

```json
{
  (...)
  "entities": "src/**/*.entity.ts"
}
```

당연히 node는 ts파일의 import 구문을 해석하지 못한다.

```shell
[Nest] 54023  - 2022. 05. 13. 오전 3:14:09   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
/Users/narc2ss/Personal/Playground/orm-test/src/entity/user.entity.ts:1
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at Object.compileFunction (node:vm:352:18)
    at wrapSafe (node:internal/modules/cjs/loader:1031:15)
```

tsconfig의 module을 `ESNext`로 설정하여도 모듈을 찾지 못하는 에러가 발생한다. 뭔가 잘못되감을 느낀다.

```shell
src/app.controller.ts:1:33 - error TS2792: Cannot find module '@nestjs/common'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

1 import { Controller, Get } from '@nestjs/common';
                                  ~~~~~~~~~~~~~~~~
src/app.module.ts:1:24 - error TS2792: Cannot find module '@nestjs/common'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

1 import { Module } from '@nestjs/common';
                         ~~~~~~~~~~~~~~~~
src/app.module.ts:2:31 - error TS2792: Cannot find module '@nestjs/typeorm'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

2 import { TypeOrmModule } from '@nestjs/typeorm';
                                ~~~~~~~~~~~~~~~~~
```

> 왜 Entity의 확장자의 옵션에 .ts가 포함될까? dist에 ts파일이 존재 할 수 있는 것인가?

---

## TypeOrmModule 설정

```js
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- `TypeOrmModule.forRoot()` 메서드의 인자에 값을 넣지 않고 호출하면 프로젝트 루트디렉토리의 ormconfig.json 내용을 적용한다.

실행 후 Database 결과

```shell
+------------------------+
| Tables_in_typeorm_nest |
+------------------------+
| user                   |
+------------------------+
```
