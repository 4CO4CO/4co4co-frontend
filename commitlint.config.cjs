module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        '!hotfix', // 핫픽스
        'docs', // 문서
        'refactor', // 리팩토링
        'test', // 테스트 코드
        'chore', // 기타 자잘한 작업
        'revert', // 리버트 커밋
        'style', // 코드 구조 변경
        'design', // UI 변경
        'remove', //  삭제
        'comment', // 주석
        'rename', // 이름 변경
      ],
    ],
    'subject-case': [0, 'never'],
  },
};
