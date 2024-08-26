# `ABCD` - `우리동네`

해커그라운드 해커톤에 참여하는 `ABCD` 팀의 `우리동네`입니다.

## 참고 문서

> 아래 두 링크는 해커톤에서 앱을 개발하면서 참고할 만한 문서들입니다. 이 문서들에서 언급한 서비스 이외에도 더 많은 서비스들이 PaaS, SaaS, 서버리스 형태로 제공되니 참고하세요.

- [순한맛](./REFERENCES_BASIC.md)
- [매운맛](./REFERENCES_ADVANCED.md)

## 제품/서비스 소개

<!-- 아래 링크는 지우지 마세요 -->
[제품/서비스 소개 보기](TOPIC.md)
<!-- 위 링크는 지우지 마세요 -->

## 오픈 소스 라이센스

<!-- 아래 링크는 지우지 마세요 -->
[오픈소스 라이센스 보기](./LICENSE)
<!-- 위 링크는 지우지 마세요 -->

## 설치 방법

> **아래 제공하는 설치 방법을 통해 심사위원단이 여러분의 제품/서비스를 실제 Microsoft 애저 클라우드에 배포하고 설치할 수 있어야 합니다. 만약 아래 설치 방법대로 따라해서 배포 및 설치가 되지 않을 경우 본선에 진출할 수 없습니다.**

0. 깃허브에서 코드를 zip 파일로 다운받은뒤 압축 해제 합니다.
 ![스크린샷 2024-08-26 235554](https://github.com/user-attachments/assets/6e193a1d-6d53-4566-8784-ac55b9559eb5)
 ※ 다운받은 ZIP 파일은 대부분 파일 탐색기의 '다운로드' 폴더에 저장됩니다
![스크린샷 2024-08-27 000149](https://github.com/user-attachments/assets/ba17df1a-15a4-4ec3-9f47-5157a2989605)

![스크린샷 2024-08-26 235829](https://github.com/user-attachments/assets/3574287b-c7b3-4ef7-9736-97318929ee3e)

1. https://nodejs.org/en 사이트에 접속하여 'Download Node.js LTS' 버튼을 눌러 node.js msi 파일을 다운한다.

![SADdsa](https://github.com/user-attachments/assets/2ae8f9b8-2ca3-4e79-8702-36da94bf7264)

1-1. .msi 파일을 실행해 Node.js를 설치한다.
> ※ 되도록이면 Next로 빠르게 넘어가자

![스크린샷 2024-08-27 000432](https://github.com/user-attachments/assets/6c06421b-7092-4888-acfa-d71177df46ef)

![스크린샷 2024-08-27 000816](https://github.com/user-attachments/assets/fb4dd5bb-2bba-4384-a046-aa7f18c33d37)

 2.Visual Studio Code를 키고, Ctrl + Shift + ` 커맨드를 입력해 터미널을 가져옵니다.

![스크린샷 2024-08-27 003419](https://github.com/user-attachments/assets/807a6c6a-d786-4191-8654-066e241ef698)


### 사전 준비 사항

 Azure 구독이 되어져 있는 계정 >> 구독은 Visa, MasterCard, American Express로 가능함
 Azure CLI, Azure Powershell >> 리소스 관리를 위해 필요하고, az login 명령어로
 콘솔에서 Azure에 접근
 Visual Studio Code
 Github 계정 >> Visual Studio Code에서 콘솔로 배포할 때 Github 계정을 사용함
 node.js package 파일 및 프로젝트 파일
 Docker Desktop
 Git

## 시작하기

0. 다운받은 압축된 코드 파일 풀기
  
  ![스크린샷 2024-08-27 002250](https://github.com/user-attachments/assets/015fa3a4-48b8-4605-9645-cff98d3fed67)

  ![스크린샷 2024-08-27 002442](https://github.com/user-attachments/assets/0f579803-1276-4be6-8700-087b2909a642)

0-1. 압축이 풀린 파일 안 같은 이름의 파일 꺼내기

![스크린샷 2024-08-27 002605](https://github.com/user-attachments/assets/db5ac7cd-17af-4822-8ddc-f26103d4849a)

![스크린샷 2024-08-27 002756](https://github.com/user-attachments/assets/3422db0b-635f-456e-a995-beadc3850a19)
※이런 파일들이 보인다면 성공~

0-2. Visual Studio Code를 실행하고, 왼쪽 위의 파일(File)을 클릭.
  
  ![스크린샷 2024-08-27 001545](https://github.com/user-attachments/assets/30fcc3b2-c0a6-4f48-94e3-c12889a81311)

0-3. 폴더 열기... 클릭 후 압축이 풀린 코드 폴더 선택하기 
  ![스크린샷 2024-08-27 001904](https://github.com/user-attachments/assets/093aa0e3-2882-4742-b3b2-d5bbb52d1eb5)

  ![스크린샷 2024-08-27 003024](https://github.com/user-attachments/assets/a8b41a08-a5f8-4a93-b51f-e50af94f3cde)

  ![스크린샷 2024-08-27 003110](https://github.com/user-attachments/assets/686c5de5-b6a1-4301-902f-f4baa124a5bf)
  ※ Visual Studio Code 파일 탐색기에서 이런 파일들이 보인다면 성공~

 1. Ctrl + Shift + ` 키를 눌러 터미널을 실행시킴.

![스크린샷 2024-08-27 003419](https://github.com/user-attachments/assets/edfa497b-2dbd-4495-9e61-d8bfb3449979)

 2. ```az login``` 실행 후, MS 계정 로그인
![스크린샷 2024-08-27 004016](https://github.com/user-attachments/assets/4e12670a-41c8-4ca2-a77c-e3e5bcd5f6c2)

![스크린샷 2024-08-27 004146](https://github.com/user-attachments/assets/52af5531-9432-4653-a0f7-02ab69f10279)

    ※간혹 로그인이 되지 않을 때가 있는데, 이는 tenant 오류. 위의 노란색 글씨의 warning 글씨 중 'tenant '...'' 를 복사해 ```az login --tenant ...``` 실행
    ![스크린샷 2024-08-27 004318](https://github.com/user-attachments/assets/ba3f977b-eda2-42fe-8925-24fc2d5ae2a9)
    ![스크린샷 2024-08-27 004432](https://github.com/user-attachments/assets/3c16cf7d-f590-4872-9564-53610550846c)

 3. 터미널에 ```azd auth login``` 실행 후, MS 계정 로그인
![스크린샷 2024-08-27 004755](https://github.com/user-attachments/assets/e0829c3c-02f3-4d77-8d7e-c6e8cf167d8a)

 4. 터미널 창 오른쪽 위 + 옆 아래화살표를 눌러 Git Bash 선택

![스크린샷 2024-08-27 013741](https://github.com/user-attachments/assets/1f4bc99a-f148-45ec-98bc-6f289a799d12)

 5. ```GITHUB_TOKEN=```
    ```gh auth login``` 실행 후

![스크린샷 2024-08-27 013935](https://github.com/user-attachments/assets/538b4d97-1f91-49da-9fe2-ac5526cfc99a)

 Github.com
 HTTPS
 Yes
 Login with a browser
 순으로 실행

![스크린샷 2024-08-27 014100](https://github.com/user-attachments/assets/1d69acd0-6b0e-4d25-bcc1-d2812d7411ad)

 이후 나오는 8자리 코드 숙지 후 Enter 입력
 브라우저에서 깃허브 로그인, 8자리 코드 입력
 
![스크린샷 2024-08-27 014328](https://github.com/user-attachments/assets/d30eff69-1a7e-4295-b6d3-1b5c00c520af)

![스크린샷 2024-08-27 014617](https://github.com/user-attachments/assets/4f5d4031-ace9-4c5e-927d-bfb579d93fa8)

![스크린샷 2024-08-27 015329](https://github.com/user-attachments/assets/3f8ab643-12a7-428f-9608-57232d5f89e6)

5-1. Git Bash 터미널을 다시 Powershell 터미널로 바꾸기 
![스크린샷 2024-08-27 022218](https://github.com/user-attachments/assets/8614a7d0-1eb0-4eee-87d4-0f13edcc176c)

6. ```azd init``` 입력 후 초기설정 완료하기

 ※ 대부분 첫번째 걸로 Enter 누르면 됨
![스크린샷 2024-08-27 020107](https://github.com/user-attachments/assets/02684afe-6d36-4c7b-8b31-2282cc36a379)

![스크린샷 2024-08-27 020203](https://github.com/user-attachments/assets/c897c337-23c2-4fa0-9907-e9d779d5505b)

7.  ```select environment...``` 창이 뜰 때, 미리 있던 Azure 리소스 그룹 이름 넣기
> ※'rg-'는 이미 할당되어 있기 때문에 생략할 것

![스크린샷 2024-08-27 020309](https://github.com/user-attachments/assets/27ced981-eb5b-4cbe-9f15-72285e1c360a)

 Visual Studio Code 왼쪽 파일 탐색기에서 .yaml 파일, .env 파일이 보인다면
8. ```azd up``` 실행 후 깔려있던 Docker Desktop 실행

![스크린샷 2024-08-27 020716](https://github.com/user-attachments/assets/aa8de56c-b1dc-4e35-af86-11ac0ced8219)

   Endpoint가 나오면 배포 끝 ~

![image](https://github.com/user-attachments/assets/c8b279b8-1e53-4c10-a7e2-a9d093472202)
