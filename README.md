# 온라인 게시판 서비스 Forum

<div align=center>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=plastic&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=plastic&logo=mysql&logoColor=white)

[![Test Status](https://github.com/wanted-pre-be5-TeamH/forum/actions/workflows/push_cov_report.yml/badge.svg)](https://github.com/wanted-pre-be5-TeamH/forum/actions/workflows/push_cov_report.yml)
[![Test Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/rojiwon0325/e9d685dac7c70dfad1305ce9d8174a29/raw/coverage_forum.json)](https://wanted-pre-be5-teamh.github.io/forum)

</div>

## 요구사항 분석

### 회원

- 필수 회원 정보: 고객명, 회원 등급, 성별, 나이, 연락처, 가입일, 마지막 접속일
- 회원 등급에 따른 게시판 기능 제한
- 회원 가입/탈퇴, 로그인

### 필수 게시판 종류

- 공지 사항, 자유게시판, 운영 게시판

### 통계

- 성별, 나이, 접속 시간별 통계처리

## 설계도

### 회원 인증

![auth](https://user-images.githubusercontent.com/68629004/198095377-56b28e4b-2f06-42ec-a52e-6e1eb0a05d80.png)

### 회원 관리

#### 사용자 권한

- 비회원: 로그인하지 않은 모든 사용자. 자유 게시판, 공지 사항, 운영 게시판 조회 및 하위 게시물 조회 가능
- 사용자: 로그인한 모든 사용자. 비회권 권한 부여. 자유 게시판 하위 게시물 생성/수정/삭제 가능
- 매니저: 사용자 권한 부여. 공지 사항, 운영 게시판 하위 게시물 생성/수정/삭제 가능
- 관리자: 매니저 권한 부여. 사용자 간단 조회, 사용자 권한 변경, 게시판 정보 수정 가능

#### 조회

![user_get](https://user-images.githubusercontent.com/68629004/198095462-852251e7-700f-453b-87b9-34557779fec7.png)

#### 수정

![user_post](https://user-images.githubusercontent.com/68629004/198095539-6b7f86da-1a14-49c0-a824-9eb59799063e.png)

### 게시판

![board_get](https://user-images.githubusercontent.com/68629004/198095610-ea445742-5b58-4eca-905e-6e9b241b0b67.png)

### 게시물

#### 조회

![post_get](https://user-images.githubusercontent.com/68629004/198095689-0a1ff932-abfe-4c1d-a3f9-bef4ecc923d8.png)

### 수정

![post_post](https://user-images.githubusercontent.com/68629004/198095863-70aa312c-66ad-48b6-b8c5-e7c86f513443.png)

### 추가 생각해볼 점

- 통계 기능은 어디에 추가할까?
  - 통계 애그리거트가 회원 관리 애그리거트와 유사하다.
  - 하지만 다른 회원 관리 기능과 결이 달라 보인다.
  - application layer만 구분하자
- 최근 접속일 갱신은 어디서 처리할까?
  - 세션에서 갱신하고 로그아웃 시점에 메인 DB에 저장하는 것이 적절할 것 같다.
  - 일단 세션을 구현하지 않을 예정이므로 임시로 권한인증 성공 시점에 메인 DB를 업데이트

## 구현 진행상황

### 회원인증

| 내용     | 상태 | API                | 인증 정보 필요 |
| -------- | ---- | ------------------ | -------------- |
| 로그인   | ✅   | POST /auth/sign-in | ❌             |
| 로그아웃 | ✅   | GET /auth/sign-out | ✅             |

### 회원관리

| 내용           | 상태 | API           | 인증 정보 필요 |
| -------------- | ---- | ------------- | -------------- |
| 회원 가입      | ✅   | POST /user    | ❌             |
| 회원 탈퇴      | ✅   | DELETE /user  | ✅             |
| 권한 변경      | ✅   | PATCH /user   | ✅             |
| 내 정보 조회   | ✅   | GET /user/me  | ✅             |
| 회원 목록 조회 | ✅   | GET /user     | ✅             |
| 회원 정보 조회 | ✅   | GET /user/:id | ✅             |
