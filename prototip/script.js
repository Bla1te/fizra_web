class Calendar {
    constructor() {
        this.currentDate = new Date(2025, 10, 1); // 1 ноября 2024
        this.init();
        this.bindEvents();
    }

    init() {
        this.renderCalendar();
    }

    bindEvents() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.changeMonth(-1);
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.changeMonth(1);
        });

        /*document.getElementById('loginBtn').addEventListener('click', () => {
            alert('Функционал входа будет реализован позже');
        });*/
    }

    changeMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendar();
    }

    renderCalendar() {
        const calendarElement = document.getElementById('calendar');
        const monthYearElement = document.getElementById('currentMonth');
        
        // Обновляем заголовок
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        
        const currentMonth = this.currentDate.getMonth();
        const currentYear = this.currentDate.getFullYear();
        
        monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        // Очищаем календарь
        calendarElement.innerHTML = '';

        // Добавляем заголовки дней недели
        const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        weekdays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day weekday';
            dayElement.textContent = day;
            calendarElement.appendChild(dayElement);
        });

        // Получаем первый день месяца и количество дней
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Определяем день недели первого дня (1 - понедельник, 0 - воскресенье)
        let firstDayOfWeek = firstDay.getDay();
        if (firstDayOfWeek === 0) firstDayOfWeek = 7; // Воскресенье становится 7

        // Добавляем пустые ячейки для дней предыдущего месяца
        for (let i = 1; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendarElement.appendChild(emptyDay);
        }

        // Добавляем дни текущего месяца
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            // Проверяем является ли день выходным
            const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dayElement.classList.add('weekend');
            }

            // Проверяем является ли день сегодняшним
            if (day === today.getDate() && 
                currentMonth === today.getMonth() && 
                currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }

            calendarElement.appendChild(dayElement);
        }
    }
}

// Инициализация календаря при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});