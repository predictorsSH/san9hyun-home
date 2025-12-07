# My Blog

Next.js로 만든 개인 블로그입니다.

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 카테고리 설정하기

`lib/categories.json` 파일에서 카테고리 정보를 관리합니다.

```json
{
  "카테고리명": {
    "name": "카테고리명",
    "subtitle": "부제목",
    "description": "카테고리 설명",
    "image": "/categories/이미지파일.jpg"
  }
}
```

카테고리 이미지는 `public/categories/` 폴더에 저장하세요.

### 포스트 작성하기

`posts` 디렉토리에 마크다운 파일을 추가하면 됩니다. 파일명이 URL 경로가 됩니다.

예시:
```
posts/my-first-post.md
```

각 마크다운 파일은 front matter를 포함해야 합니다:

```markdown
---
title: 포스트 제목
date: 2024-01-01
category: DataScience  # categories.json에 정의된 카테고리명
image: /images/포스트이미지.jpg  # 선택사항
excerpt: 포스트 요약 (선택사항)
---

포스트 내용...
```

**중요**: `category` 필드는 `lib/categories.json`에 정의된 카테고리명과 정확히 일치해야 합니다.

## 빌드

```bash
npm run build
npm start
```

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- Markdown (gray-matter, remark)

