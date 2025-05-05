import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  js.configs.recommended, // eslint 기본 recommended 설정
  ...tseslint.configs.recommended, // typescript-eslint 기본 recommended 설정
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser, // TypeScript 코드를 분석하기 위한 파서 지정
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // JSX 문법 허용
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react, // React 관련 규칙 플러그인
      'react-hooks': reactHooks, // React Hooks 전용 규칙
      import: importPlugin, // import 관련 규칙
      prettier, // Prettier와 통합
    },
    rules: {
      // 닫는 태그가 필요 없는 경우, 셀프 클로징을 강제
      'react/self-closing-comp': ['error', { component: true, html: true }],

      // JSX는 .tsx 파일에서만 허용
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],

      // React 17 이상에서는 import 불필요하므로 off
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // 동일한 모듈의 중복 import 금지
      'no-duplicate-imports': 'error',

      // console.warn, console.error, console.info만 허용
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

      // 사용되지 않는 변수는 오류 처리
      '@typescript-eslint/no-unused-vars': 'error',

      // 연속된 빈 줄 금지
      'no-multiple-empty-lines': 'error',

      // 정의되지 않은 변수 사용 금지
      'no-undef': 'error',

      // Prettier와 충돌 방지를 위해 들여쓰기 비활성화
      indent: 'off',

      // 불필요한 공백 금지
      'no-trailing-spaces': 'error',

      // import 구문 뒤에 한 줄 개행
      'import/newline-after-import': ['warn', { count: 1 }],

      // React Hooks 사용 규칙 강제
      'react-hooks/rules-of-hooks': 'error',

      // 화살표 함수 매개변수에 항상 괄호 사용
      'arrow-parens': ['error', 'always'],

      // 여러 개의 연속된 공백 금지
      'no-multi-spaces': 'error',

      // 모듈 경로 확인 비활성화 (TypeScript가 해결)
      'import/no-unresolved': 'off',

      // import 구문 정렬 순서 지정
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'], // 순서: 내장 → 외부 → 내부 → 부모 → 형제 → 인덱스
          pathGroups: [
            { pattern: './**', group: 'internal' }, // './'로 시작하는 파일은 internal로 간주
            { pattern: '../**', group: 'parent', position: 'before' }, // '../'로 시작하는 파일은 parent로 간주
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-dom'], // 특정 패턴은 그룹 제외 → 맨 위로
          alphabetize: {
            order: 'asc', // 알파벳 오름차순 정렬
            caseInsensitive: true, // 대소문자 구분 없음
          },
        },
      ],
    },
    settings: {
      react: {
        version: 'detect', // 자동으로 React 버전 감지
      },
    },
  },
  {
    ignores: ['commitlint.config.cjs', 'vite.config.ts'],
  },
];
