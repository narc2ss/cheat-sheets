> 우아한형제 - 배민근님

# FE 상태관리에 대해

## 상태란?

주어진 시간에 대해 시스템을 나타내는 것으로 **언제든지 변경될 수 있음** 즉 문자열, 배열, 객체 등의 형태로 **응용 프로그램에 저장된 데이터** → **개발자 입장에선 관리해야하는 데이터들**

## 모던 웹프론트엔드 개발

UI/Ux의 중요성과 함께 프로덕트 규모가 많이 커지고 FE에서 수행하는 역할이 늘어남 → **관리하는 상태가 많아짐**

## 상태관리는? (feat. FE)

- 상태를 관리하는 방법에 대한 것 → 프로덕트가 커짐에 따라 어려움도 커짐
- 상태들은 시간에 따라 변화함
- React에선 단방향 바인딩이므로 Props Drilling 이슈도 존재
- Redex와 MobX 같은 라이브러리를 활용해 해결하기도 함

**→ 모던 웹 프론트환경에서는 여러가지 상태들이 존재하고 이 상태들을 체계적으로 관리하기 위한 상태관리 담론들이 등장했다**

# 주문 FE 프로덕트를 보며 가진 고민

## 주문 FE 프로덕트

- 장바구니
- 주문하기
- 결제하기
- 요청완료
- 결제완료
- 주문내역

→ 이 모든 것이 웹뷰로 구성되어 있다..

## 때는 바야흐로 2021의 여름

- 레거시를 청산
- Store에 상태관련 코드보다 API 통신관련 코드가 더 많음
- 적은 인원으로 레포지토리 관리
- 팀내에서 생성되는 레포지토리가 많음
- 반복되는 컴포넌트, 로직
- 의존성 모듈 버전 문제

→ Repo합치고, 레거시 치우고 신기술 검토도 하면서 주문 FE 아키텍쳐 통합하기

## 그 중 상태관리에 관한 고민

Store는 전역 상태가 저장되고 관리되는 공간인데 상태관리보단 API 통신 코드의 양이 더 많았다

## 여기서 다 관리하는게 맞나..?

- API 통신 관련 코드가 모두 Store에?
- 또, 반복되는 `isFetching`, `isError` 등 API 관련 상태
- 또또, 반복되는 비슷한 구조의 API 통신 코드

→ 상태관리 영역이 서버값을 저장하는데까지 확장

## 서버에서 받아야하는 상태들의 특성

- Client에서 제어하거나 소유되지 않은 원격의 공간에서 관리되고 유지됨
- Fetching이나 Updating에 비동기 API가 필요함
- 다른 사람들과 공유되는 것으로 사용자가 모르는 사이에 변경될 수 있음
- 신경 쓰지 않는다면 잠재적으로 “out of date”가 될 가능성을 지님

→ 사실상 FE에서 이 값들이 저장되어있는 state들은 일종의 캐시

## 상태를 두 가지로 나누어 봅시다

Key Point는 데이터의 Ownership이 있는 곳

### Client State

- Client에서 소유하며 온전히 제어가능함
- 초기값 설정이나 조작에 제약사항 없음
- 다른 사람들과 공유되지 않으며 Client 내에서 UI/UX흐름이나 사용자 인터렉션에 따라 변할 수 있음
- 항상 Client 내에서 최신 상태로 관리됨

→ Ownership이 Client에!

### Server State

- Client에서 제어하거나 소유되지 않은 원격의 공간에서 관리되고 유지됨
- Fetching/Updating에 비동기 API가 필요함
- 다른 사람들과 공유되는 것으로 사용자가 모르는 사이에 변경될 수 있음
- 신경 쓰지 않는다면 잠재적으로 “out of date”가 될 가능성을 지님

→ Ownership이 Server에!

## 다시, 상태관리 라이브러리

얘네가 지금에 와서도 서버 상태를 관리하기 적합할까요?

- Redux
- MobX
- Recoil

→ 주문 FE 프로덕트에서 선택한 해답은 **React Query**

# React Query 살펴보기

## React Query 자기소개

Fetch, cache and update data in your React and React Native applications all without touching any “global state”.

- Declarative & Automatic
- Simple & Familiar
- Powerful & Configurable

## Overview

React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze.

- 데이터 가져오기
- 캐시
- 동기화
- 데이터 업데이트

→ 서버 상태를 관리

---

React Query is gands down one of the best libaries for managing server state. It works amazingly well out-of-the-box, with zero-config, and can be customized to your liking as your application grows.

→ React Query는 zero-config로 즉시 사용가능, But 원하면 언제든 config도 커스텀 가능!

## 됐고 간단한 예제 하나

> 공식문서 예제

```jsx
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```

→ 딱히 config도 없고 코드도 React Hooks같고 첫 인상은 그래도 좀 간단해 보인다

## 본격적으로 알아보기 전에!

React에서 사용하려면 QueryClientProvider 필수

```jsx
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
```

## 세 가지 core 컨셉 살펴보기

공식 문서 Quick Start에서 짚은 3가지 개념

### Queries

- A query is a declarative dependency on an asynchronous source of data that is tied to a unique key
- A query can be used with any Promise based method (including GET and POST methods) to fetch data form a server.
- If your method modifies data on the server, we recommend using Mutations instead.

**→ Queries는 데이터 Fetching용! CRUD 중 Reading에만 사용할 거에요**

```jsx
import { useQuery } from "react-query";

function App() {
  const info = useQuery("todos", fetchTodoList);
  // useQuery(Query Key, Query Function)
}
```

**Query Key**

React Query는 Query Key에 따라 query caching을 관리합니다. → Key, Value 맵핑구조 생각

- String 형태

```jsx
// A list of todos
useQuery('todos', ...); // queryKey === ['todos']

// Something else, whatever!
useQuery('somethingSpecial', ...) // queryKey === ['somethingSpecial']
```

- Array 형태

```jsx
// An individual todo
useQuery(['todo', 5], ...);
// queryKey === ['todo', 5]

// An individual todo in a "preview" format
useQuery(['todo', 5, { preview: true }], ...);
// queryKey === ['todo', 5, { preview: true }]

// A list of todos that are "done"
useQuery(['todos', { type: 'done' }], ...);
// queryKey === ['todos', { type: 'done'  }]
```

**Query Function**

Promise를 반환하는 함수 → 데이터를 resolve 하거나 error를 throw

**그럼 useQuery가 반환하는 것은?**

- `data` : 마지막으로 성공한 resolve된 데이터 (Response)
- `error` : 에러가 발생했을 때 반환되는 객체
- `isFetching` : Request가 in-flight 중일 때 `true`
- `status` `isLoading` `isSuccess` 등 : 모두 현재 query의 상태
- `refetch` : 해당 query refetch하는 함수 제공
- `remove` : 해당 query cache에서 지우는 함수 제공

→ 이 외에도 많은 값을 반환하니 공식문서 꼭 확인하기

**config 커스텀을 해보자! useQuery의 Option**

- `onSuccess` `onError` `onSettled` : query fetching 성공/실패/완료 시 실행할 Side Effect 정의
- `enabled` : 자동으로 query를 실행시킬지 말지 여부
- `retry` : query 동작 실패 시, 자동으로 retry 할지 결정하는 옵션
- `select` : 성공 시 가져온 data를 가공해서 전달
- `keepPreviousData` : 새롭게 fetching 시 이전 데이터 유지 여부
- `refetchInterval` : 주기적으로 refetch 할지 결정하는 옵션

→ 이게 다가 아니다 공식문서 꼭 읽자!

**queries 파일 분리도 추천!**

- Query 선언부

```jsx
export const useFetchOrder = (orderNo, options) =>
  useQuery("fetchOrder", () => fetchOrder(orderNo), options);

export const useFetchDeliveryStatus = (orderNo, options) =>
  useQuery("fetchDeliveryStatus", () => fetchDeliveryStatus(orderNo), options);
```

- Components

```jsx
const fetchOrderResult = useFetchOrder(orderNo, {
  onSuccess: (fetchOrderResultData) => {
    // onSuccess 로직
  },
  onError: (error) => {
    // onError 로직
  },
});

const fetchDeliveryStatusResult = useFetchDeliveryStatus(orderNo, {
  onSuccess: (data) => {
    // onSuccess 로직
  },
  onError: (error) => {
    // onError 로직
  },
});
```

**그럼 query가 여러 개일 땐**

```jsx
function App() {
  const usersQuery = useQuery("users", fetchUsers);
  const teamsQuery = useQuery("teams", fetchTeams);
  const projectsQuery = useQuery("projects", fetchProjects);
}
```

**그럼 질문1! (기술블로그 댓글 발췌)**

useQuery()를 쓸 때 선언적인 성격 때문에 고민될 때가 있었습니다.

예를 들어 마운트 시에는 데이터가 패치되지 않고 버튼을 클릭했을 때 데이터를 패치 받아서 데이터에 따라 history.push 해야하는 상황을 가정

1. enabled를 false로 두고 이벤트 핸들러에서 refetch()로 매뉴얼하게 패치하는 방법

2. enabled옵션에 해당하는 상태를 useState로 컴포넌트내에 두고, 이벤트 핸들러에서 해당 상태 값을 변경하여 enabled를 조건부로 만족시켜 패치 시키는 방법

github discussion을 살펴보니 react query제작자들은 선언적이라는 이유로 2)를 권장하는 것으로 보인다. (찔러야할 API가 많을 때, 관리할 state가 너무 많아진다)

**→ 배민준님은 간단한 상황에는 1번을 사용하고 복잡한 컨디션일 경우 2번을 사용, 코드의 복잡도가 올라갈 수 있기 때문**

> 곽재형 : “백엔드에게 API 를 파달라고하고 한번에 가져온다”
> 우아한Tech : 재형님께 쿠폰을 드리겠습니다~! ㅎㅎ
> ??? : ㅋㅋㅋㅋㅋㅋ

**그럼 질문2!**

useQuery를 이용해 불러온 server state를 이용해 액션을 생성해야 하는 경우가 있을텐데, 이 때는 어느 단계 (action creator?) 에서 server state를 참조하나요?

**→ `options`의 `onSuccess`에서 dispatch를 발생시켜 client state를 변화시킨다**

### Mutations

- Unlike quries, mutations are typically used to create/update/delete data or perform server side-effetcs. For this purpose, React Query exports a useMutation hook.

**→ CRUD 중 Create/Update/Delete에 모두 사용할거에요**

```jsx
const mutation = useMutation((newTodo) => {
  return axios.post("/todos", newTodo);
});
```

useQuery 보다 더 심플하게 Promise 반환 함수만 있어도 된다. 단, Query Key를 넣어주면 devtools에서 볼 수 있다.

**useMutation**

- `mutate` : mutation을 실행하는 함수
- `mutateAsync` : mutate와 비슷 But Promise 반환
- `reset` : mutation 내부 상태 clean

→ 나머지는 useQuery랑 비슷하다 오히려 반환하는 값이 더 적다! 그래도 공식문서 꼭 보자?

**useMutation Option**

- `onMutate` : 본격적인 Mutation 동작 전에 먼저 동작하는 함수, Optimistic update 적용할 때 유용

→ 나머지는 useQuery랑 비슷하다 오히려 Option이 더 적다! 그래도.. 말 안해도 알지?

### Query Invalidation

- 간단히 queryClient를 통해 invalidate 메소드를 호출하면 끝!

```jsx
// Invalidate every query in the cache
queryClient.invalidateQueries();

// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries("todos");
```

- 이러면 해당 Query Key를 가진 query는 stale(신선하지 않음) 취급되고, 현재 rendering 되고 있는 query들은 백그라운드에서 refetch 된다.
