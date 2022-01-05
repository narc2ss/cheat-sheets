# Git 계정 스위칭

회사 깃허브 계정과 개인 깃허브 계정을 스위칭 하며 사용해보자

> https방식을 사용하면 ID/PW를 입력해야하기 때문에 SSH를 활용.

<br />

## 1. 글로벌로 설정된 사용자 이름과 이메일 삭제

글로벌로 설정된 사용자 정보가 있다면, 의도치 않은 문제가 생길 수 있기 때문에 글로벌 사용자 정보를 삭제한다. (개인계정에 회사코드를 푸시한다거나..?)

```zsh
$ git config --global --unset user.name
$ git config --global --unset user.email
```

<br />

## 2. SSH 키 생성

```zsh
$ ssh-keygen -t rsa -b 4096 -C "email"
```

- `-t sra` : RSA 암호화 타입으로 Key 파일의 타입을 정의
- `-b 4096` : 생성할 키의 비트수를 지정
- `-C "email"` : 주석 입력을 위한 옵션

그럼 다음과 같이 나오는데, 키를 저장할 경로와 이름을 잘 적어주자

```zsh
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/narc2ss/.ssh/id_rsa): /User/narc2ss/.ssh/id_rsa_personal
```

위 과정을 반복하여 `id_rsa_company` 키를 더 생성하자

<br />

## 3. 생성한 SSH 키를 ssh-agent에 등록

개인키의 비밀번호를 암호화 하여 기억해두고 처음 한 번만 개인키 비밀번호를 입력하면 다음부터는 기억한 비밀번호를 이용하므로 사용자는 또 비밀번호를 입력하지 않아도 된다.

```zsh
$ ssh-add ~/.ssh/id_rsa_personal
$ ssh-add ~/.ssh/id_rsa_company
```

<br />

## 4. 특정 디렉터리 아래 저장소들의 사용자 정보 설정

회사 프로젝트 경로

```zsh
$ ~/Company
```

개인 프로젝트 경로

```zsh
$ ~/Personal
```

.gitconfig 파일은 특정 사용자(즉 현재 사용자)에게만 적용되는 설정으로 아래와 같이 수정 (없으면 생성)

```zsh
# ~/.gitconfig

[includeIf "gitdir:~/Company/"]
    path = ~/Company/.gitconfig

[includeIf "gitdir:~/Personal/"]
    path = ~/Personal/.gitconfig
```

회사 계정용 .gitconfig 작성

```zsh
# ~/Company/.gitconfig

[user]
  name = company_name
  email = company_email
```

개인계정용 .gitconfig 작성

```zsh
# ~/Personal/.gitconfig

[user]
  name = narc2ss
  email = private.narc2ss@gmail.com
```

<br />

## 5. push, clone 등을 할 때 다른 SSH 키 사용하기

```zsh
# ~/.ssh/config

Host company
  User git
  Port 22
  HostName github.com
  IdentityFile ~/.ssh/id_rsa_company

Host personal
  User git
  Port 22
  HostName github.com
  IdentityFile ~/.ssh/id_rsa_personal
```

이제 호스트 이름을 github.com 대신 company 또는 personal 을 사용해 SSH 인증 계정을 변경하며 작업이 가능하다.

```zsh
# 일반적인 사용
$ git@github.com:narc2ss/todo_list_client.git

# 설정 후 사용
$ git clone git@personal:narc2ss/todo_list_client.git
```

## 6. 깃허브 계정에 SSH key 등록

개인계정에 SSH 공개키를 등록하자, 개인키는 외부로 유출이 되어서는 안된다.

```zsh
$ cat ~/.ssh/id_rsa_personal.pub
ssh-rsa AAAA~XEw== private.narc2ss@gmail.com # 복사
```

1. 로그인
2. settings
3. SSH ans GPG keys
4. new SSH key
5. 제목을 적고 Key에 위에 복사한 공개키를 붙여넣기
6. Add SSH key

회사용 계정도 위와 동일하게 반복

\- The end -

## 참고

- [한 대의 컴퓨터에서 여러 GIT 계정 사용하기](https://velog.io/@monk_lee/%ED%95%9C-%EB%8C%80%EC%9D%98-%EC%BB%B4%ED%93%A8%ED%84%B0%EC%97%90%EC%84%9C-%EC%97%AC%EB%9F%AC-GIT-%EA%B3%84%EC%A0%95-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [git 공식 홈페이지](https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-Git-%EC%B5%9C%EC%B4%88-%EC%84%A4%EC%A0%95)
- [GitHub 멀티 어카운트를 사용할 때 유용한 Git 설정](https://www.lainyzine.com/ko/article/useful-git-settings-when-using-github-multi-account/)
