// 입장코드 유효성 검사 함수
export const validateEntryCode = (code: string): string | null => {
  const trimmedCode = code.trim();

  if (!trimmedCode) {
    return '입장코드를 입력해주세요.';
  }

  // 전체 형식 체크(이름-숫자4자리)
  const entryCodeRegex = /^([가-힣a-zA-Z0-9\s]+)-(\d{4})$/;
  const match = trimmedCode.match(entryCodeRegex);

  if (!match) {
    return '입장코드는 이름-숫자4자리 형식으로 입력해주세요. (예: 홍길동-1234)';
  }

  // 이름 부분 검증
  const [, name] = match;

  if (name.length < 1 || name.length > 50) {
    return '이름은 1자 이상, 50자 이하로 입력해주세요.';
  }

  if (name.replace(/\s/g, '').length === 0) {
    return '공백만으로는 이름을 입력할 수 없습니다.';
  }

  const nameRegex = /^[가-힣a-zA-Z0-9\s]+$/;
  if (!nameRegex.test(name)) {
    return '이름은 한글, 영문, 숫자만 입력 가능합니다.';
  }

  return null;
};