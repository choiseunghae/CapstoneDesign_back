const storedColor = localStorage.getItem('themeColor');
        if (storedColor) {
            changeThemeColor(storedColor);
            const activeButton = document.getElementById(storedColor.slice(1));
            activeButton.classList.add('active');
        }

        function changeThemeColor(color) {
            // 모든 페이지 요소 색상 변경
            const root = document.documentElement;
            root.style.setProperty('--color-blue', color);
            root.style.setProperty('--color-green', color);
            root.style.setProperty('--color-red', color);

            // 색상 저장
            localStorage.setItem('themeColor', color);

            // 활성화된 버튼 스타일 변경
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => button.classList.remove('active'));
            const activeButton = document.getElementById(color.slice(1));
            activeButton.classList.add('active');
        }