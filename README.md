<div align="center">

# Object Oriented PhoneBook

</div>

Courtesy of [_널널한 개발자 TV. 객체지향 프로그래밍과 디자인 패턴_](https://www.youtube.com/playlist?list=PLXvgR_grOs1CTu1t6_0C40SEF61Vv08s5).

본 영상은 c를 c++로 변환하며, 필자는 js로 변환합니다.

## 구현 메소드

**View & Controller(CLI)**

- add(): 사용자 정보를 생성하여 리스트에 추가하는 메소드
- remove(): 콘솔을 통해 이름을 입력받아 자료를 검색하고 삭제하는 메소드
- search(): 콘솔을 통해 이름을 입력받아 자료를 검색하는 메소드
- printAll(): 리스트에 들어있는 모든 데이터를 화면에 출력하는 메소드
- printUI(): 메뉴를 출력하는 UI 메소드

**Model(Single Linked List 자료구조)**

- findNode(name): 리스트에서 이름으로 특정 노드를 검색하는 메소드
- addNewNode(name, phone): 이름과 번호를 입력받아 리스트에 추가하는 메소드
- removeNode(name): 이름을 입력받아 노드를 검색하고 삭제하는 메소드
- loadList(): 데이터 파일에서 노드를 읽어와 리스트를 완성하는 메소드
- saveList(): 리스트 형태로 존재하는 정보를 파일에 저장하는 메소드

다음은 js 환경에서 GC에 의해 구현이 필요없는 메소드입니다.

- flushStdin(): 입력 초기화 메소드
- releaseList(): 리스트의 모든 정보를 삭제하는 메소드
