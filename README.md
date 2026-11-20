# Iron Rift FPS — Vercel 배포

브라우저에서 실행되는 Vite 기반 3D 게임입니다. 게임 모델, 이미지, 음원은 `public/`에 포함되어 있으며, 별도 런타임 서비스나 환경 변수 없이 배포할 수 있습니다.

## 배포

1. 이 프로젝트의 **루트 파일**(`package.json`, `vercel.json`, `public/`, `src/` 등)을 Git 저장소에 올립니다.
2. [Vercel](https://vercel.com/new)에서 저장소를 가져옵니다. 루트 디렉터리는 이 프로젝트 폴더로 지정합니다.
3. `vercel.json`이 Vite, `npm run build`, 출력 폴더 `dist`를 지정합니다. 별도 설정 없이 Deploy를 누르면 됩니다.

Vercel CLI를 쓰는 경우 프로젝트 폴더에서 `vercel --prod`를 실행할 수 있습니다. ZIP 파일을 쓴다면 먼저 압축을 풀고 **내용물**을 저장소 루트 또는 배포할 폴더에 넣으세요.

## 로컬 확인

```bash
npm ci
npm run build
npm run preview
```

빌드에는 Node.js 24가 필요합니다. 테스트는 `npm test`로 실행합니다.

## 배포 내용

`npm run build`는 TypeScript 검사 후 Vite 정적 사이트를 `dist/`에 만듭니다. 저장 데이터와 설정은 사용자 브라우저의 `localStorage`에 저장됩니다. 서버나 데이터베이스는 사용하지 않습니다.
