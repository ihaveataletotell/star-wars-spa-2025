deploy https://star-wars-spa-2025.vercel.app/
code https://github.com/ihaveataletotell/star-wars-spa-2025

### Info (en)
1. The application is implemented using the practice of separating the view from the business logic, so the logic is described in services. For state management, I use Zustand as a simple library that implements the Observer pattern. The file organization follows a simplified FSD principle, adhering to its main concepts — 2 godmode layers (shared + entities), slices with structure grouping, and the absence of segments.
2. The form logic could have been implemented using a library like @mantine/forms, but for the same reason as in point 1, a small service was written for the forms.
3. The edit form is implemented using the Builder pattern. If a more beautiful form is needed, it can be manually built. Conversely, to further automate in the CRM solution, libraries like React-Admin can be used. For this task, I focused more on writing my own code to assess it.
4. All the code is maintainable and extensible, covered with unit and e2e tests. The application is developed with a focus on basic architecture implementation without overengineering, and its expansion is intuitive.

### Info (rus)
1. Приложение реализовано с использованием практик отделения view от бизнес логики, поэтому логика описана в сервисах, для стора использую zustand как любую простую библиотеку, реализующую Observer паттерн. Использована организация файлов по принципу упрощенного FSD с соблюдением его основных концепций - 2 godmode слоя - shared + entities, slices with structure grouping, а также отсутствие segments
2. Логику форм можно было реализовать используя библиотеку, например @mantine/forms, но по той же причине что и в п.1 для форм был написан небольшой сервис
3. Форма редактирования реализована используя Builder паттерн, если нужно строить форму более красиво, можно построить ее вручную. И наоборот, чтобы еще дальше пойти с автоматизацией в CRM решение можно использовать нужные библиотеки, например React-Admin. При реализации данного задания я делал упор больше на написание своего кода для его оценки
4. Весь код является поддерживаемым и расширяемым, покрыт unit и e2e тестами. Проработка приложения выполнена по принципу реализации базовой архитектуры без оверинжиниринга, расширение которой является интуитивно понятным
