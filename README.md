<div align="center">

# Object Oriented PhoneBook

</div>

Courtesy of [_널널한 개발자 TV. 객체지향 프로그래밍과 디자인 패턴_](https://www.youtube.com/playlist?list=PLXvgR_grOs1CTu1t6_0C40SEF61Vv08s5).

본 영상은 c를 c++로 변환하며, 필자는 js로 변환합니다.

## 클래스 다이어그램

### 1단계: 객체화

![](assets/step1.drawio.png)

- SingleLinkedList 객체는 자체로 작동합니다. 따라서, UserInterface 객체와 Aggregation 관계입니다.
- ListNode 객체는 자체로 작동하지 않습니다. 따라서, SingleLinkedList 객체와 Composition 관계입니다..
- UserInterface 객체는 printAll 메소드가 실행되는 동안만 ListNode 객체와 관계가 유지됩니다.


### 2단계: 캡슐화 강화

![](assets/step2.drawio.png)


> **TODO:**
> 
> - SingleLinkedList 객체를 다른 자료구조 객체로 바꿔보기.
> - ListNode 객체를 수정할 때, 연관된 객체들도 수정되지 않게끔 바꿔보기.