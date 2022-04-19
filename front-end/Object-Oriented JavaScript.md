> 코드스피츠 객체지향 자바스크립트 1회차

```jsx
const Worker = class {
  run() {
    console.log("working");
  }

  print() {
    this.run();
  }
};

const HardWorker = class extends Worker {
  run() {
    console.log("hard working");
  }
};

const worker = new HardWorker();
console.log(worker instanceof Worker); // true
worker.print(); // hard working
```

### Substitution + Internal identity = Polymorphism

확장된 객체는 원본으로 대체가능 (대체가능성)

생성시점의 타입이 내부에 일관성있게 참조됨 (내적일관성)

# SOLID원칙

## 단일책임 원칙 (Single Responsibility Principle)

객체의 코드를 고치는 이유는 하나뿐이어야 한다.

SRP를 지키지 못하였을때 객체 하나를 수정하면 수 많은 일들이 일어나 에러가 발생하는 산탄총 수술현상이 발생하게 된다.

우리 회사는 단위테스트가 촘촘해 → 오죽 못짰으면 단위테스트가 촘촘할까

격리 수준이 높으면 단위테스트의 보호가 없어도 회귀 테스트를 할 필요가 없을 것이다.

### SRP를 준수하는 객체망이 문제를 해결

설계는 언제나 조직이나 상황을 보고 도입해야 한다.

단일 책임 원칙을 준수하는 객체에게 책임 이상의 업무를 부여하면?

1. 만능객체가 되려한다.
2. 다른 객체에게 의뢰한다.

다른 객체에게 의뢰하는 것 = 다른 객체에게 메시지를 보내는 것

1. 메시지 - 의뢰할 내용
2. 오퍼레이션 - 메세지를 수신할 객체가 제공하는 서비스
3. 메소드 - 오퍼레이션이 연결될 실제 처리기

## 개방폐쇄 원칙 (Open Closed Principle)

open → extends, implements

closed → 수정이 필요하면 새로운 extends class 또는 implements class를 만들어 해결하여, 기존클래스를 건드리지 않게 하도록

문제들에 대한 공통점을 인식해서 추상화를 성공했기 때문에 그 다음번에 대한 문제도 추상화를 이어받아 문제를 해결할 수 있다.

## 업캐스팅 안전 원칙 (Liskov Subsitusion Principle)

자식은 부모를 대체 가능하다 → 업캐스팅이 안전하다

추상층의 정의가 너무 구체적이면 구상층의 구현에서 모순이 발생한다.

```
추상층 - 생물
숨을 쉰다, 다리로 이동한다.

구상층
사람 OK
타조 OK
아메바 NO
독수리 NO
고래 NO
```

```
추상층 - 생물(숨을쉰다), 다리이동(다리로 이동한다.)

구상층
사람: 생물, 다리이동 OK
타조: 생물, 다리이동 OK
아메바: 생물 OK
독수리: 생물 OK
고래: 생물 OK
```

## 인터페이스 분리 원칙 (Interface Segregation Principle)

당신이 인터페이스를 분리해야 문제를 해결할 수 있다.

**소유객체**

모듈이 바라봐야할 역할만큼 객체를 만들어서 대응하게 할 수 있다.

**인터페이스**

처음부터 인터페이스에 맞게끔 메서드를 오버라이드를 하는 방식 모듈에서 볼때는 본질을 보는게 아니라 인터페이스의 역할로 인식할 수 있게끔 하는 방식

결론 객체의 변화가 각각의 모듈과 묘듈에 관련된 인터페이스에만 영향을 끼치도록 분산시키는것.

## 다운캐스팅 금지 원칙 (Dependency Inversion Principle)

의존성은 언제나 부모쪽으로 흘러야한다.

코드안에 다운캐스팅이 들어있다면 망했다고 볼 수 있다.

고차원의 모듈은 저차원의 모듈에 의존하면 안된다. 이 두 모듈 모두 추상화된 것에 의존해야 한다.

추상화 된 것은 구체적인 것에 의존하면 안 된다. 구체적인 것이 추상화된 것에 의존해야 한다.

# 격언

## DI Dependency Injection 의존성 주입

IoC의 구현체 중 한개 IoC를 알아야 한다.

## IoC Inversion of Control 제어역전

## DRY Don't Repeat Yourself 중복 방지

## Hollywood Rinciple 의존성 부패방지

물어보지 말고 기다려라. 액션을 처리하는 주체가 통신을 하게끔

ex) 내 번호는 010-0000-0000이니까 시간날때 전화좀 줘

## Law of demeter 최소 지식

어떤 객체에 대한 지식을 알 때 최소로 알아야한다. 너무 많이 알면 의존성 부패가 일어난다.

**classA.methodA의 최대 지식 한계**

- classA의 필드 객체
- methodA가 생성한 객체
- methodA의 인자로 넘어온 객체

인자로 받아온 객체의 .을 연속적으로 사용해서 내부에 있는 타입도 알게되고 이 메서드는 연계의 의존성이 생겨 메서드가 붕게된다. 이러한 현상을 기차처럼 생겼다해서 열차전복이라는 train wreck이라는 현상이 발생하게 된다.

# 의존성 종류

의존성은 가장 중요한 격리의 문제 객체는 너무 많이 알아도 안되고 너무 적게 알아도 안된다

의존성이 없으면 만능객체가 태어나게 된다

의존성이 심하면 심할수록 자신이 영향을 많이 받게 된다.

너무 적게 알면

객체의 생명 주기 전체에 걸친 의존성

- 상속(extends)
  - 상속에 의한 의존성은 강력하다.
- 연관(association)
  - 필드의 객체타입을 알고 있다.

각 오퍼레이션 실행시 임시적인 의존성

- 의존 (dependency)
  - 오퍼레이션 안에 메서드에 의해 만들어진 객체나 인자로 넘어온 객체는 메서드를 호출하지 않으면 의존성이 없고, 메서드 호출이 끝나면 의존성이 깨진다. 메서드 단위로 의존성이 생기게 된다.

객체의 생명주기 전체에 걸친 의존성 → 오퍼레이션 실행시 임시적인 의존성 = 상속을 소유로 바꾸기

### 의존성이 높으면

1. 수정 여파 규모 증가
2. 수정하기 어려운 구조 생성
3. 순환 의존성

객체지향방법론을 동원해서 격리구간을 세우고 의존성을 관리하기 위해서

의존성을 왜 관리하는가 → 변화에 대한 격리를 하기 위해서

## Dependenct Inversion

어떠한 경우에도 다운캐스팅은 금지

폴리모피즘 (추상인터페이스) 사용

```jsx
const Worker = class {
  run() {
    console.log("working");
  }

  print() {
    this.run();
  }
};

const HardWorker = class extends Worker {
  run() {
    console.log("hard working");
  }
};

const Manager = class {
  constructor(...workers) {
    if (workers.every((worker) => worker instanceof Worker))
      this._workers = workers;
    else throw new Error("invalid workers");
  }

  doWork() {
    this._workers.forEach((worker) => worker.run());
  }
};

const worker = new HardWorker();

const manager = new Manager(new Worker(), new HardWorker());
manager.doWork();
// working
// hard working
```

Manager 생성자에서 Worker를 검색한 것은 폴리모피즘을 이용하여 HardWorker를 추상클래스로 본것.

하위클래스(HardWorker)를 인식하지 않으므로써 더 많은 하위 클래스를 만들어도 Worker family면 다 받아주겠다는 의미.

Worker로 부터 더 많은 extension을 만들 수 있으니 확장에 열려있고(Open extends) 그럼에도 불구하고 Manager의 코드를 수정하지 않아도 되기 때문에 변화에는 Closed되있다 → OCP

OCP를 달성하면 자연스럽게 의존성 역전이 달성된다. 의존성은 추상클래스를 가지고 있다. → DIP

DIP는 OCP와 깊은 연관을 가지고 있다.

# Inversion of Control

SOLID조차도 다 IoC를 위한것, IoC가 달성되면 객체지향이 달성됬다고 봐도 된다.

반대로 하나라도 달성이 안됬다면 IoC가 달성되지 않았다.

## 제어역전의 개념과 필요성

제어의 개녕

1. Control = flow control (프로그램의 흐름제어, 고유명사)
2. 광의에서 흐름제어 = 프로그램 실행 통제
3. 동기흐름제어, 비동기 흐름제어 등

역전이란

역으로 대체해주는 객체를 만들겠다는것 → 내가 직접 하지 않겠다 → 위임하겠다.

비유) 내가 운전을 못해도 뛰어난 실력을 가진 운전자가 모는 택시를 타면 외부에서 보았을때 뛰어난 운전 기사를 대체할 수 있다는 것 → 제어를 운전기사가 대체해주기 때문에 Inversion of Driving

문제점

1. 흐름제어는 상태와 결합하여 진행됨
2. 상태 통제와 흐름제어 = 알고리즘
3. 변화에 취약하고 구현하기도 어려움

대안

1. 제어를 추상화하고
2. 개별 제어의 차이점만 외부에서 주입받는다.

## 제어역전 실제 구현

전략패턴 & 템플릿 메서드 패턴 < 컴포지트 패턴 < 비지터 패턴

보다 넒은 범위의 제어 역전을 실현함

### 내가 원할 때 내가 원하는 애를 적당하게 만들어서 끼워넣고 싶으면?

추상팩터리 메소드 패턴

왼쪽 패턴은 이미 만들어진 객체의 행위를 제어역전에 참여시킬 수 있지만 참여할 객체 자체를 생성하고 행위까지 위임하기 위해 추상팩토리 메소드를 사용함, 일반적으로 비지터 패턴과 결합한다.
