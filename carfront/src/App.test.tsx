import { describe, test, expect } from 'vitest'
import { render , screen} from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom/vitest';

describe("App tests", () => {
    test("component renders", () => {
        // 테스트 케이스 코드
        render(<App />);
        // 앱 헤더 텍스트가 렌더링되었는지 확인
        expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
    })
})