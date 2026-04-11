# 🗂️ Быстрая шпаргалка: BehaviorSubject vs localStorage

## ⚡ Шпаргалка в 1 минуту

### **BehaviorSubject** 🔵

```typescript
// 1. Создание
private usersSubject = new BehaviorSubject<IUser[]>([]);

// 2. Превращение в Observable (для подписи)
users$ = this.usersSubject.asObservable();

// 3. Отправка нового значения (уведомляет подписчиков)
this.usersSubject.next(newUsers);  ← ⚡ МГНОВЕННО!

// 4. Получение текущего значения
const current = this.usersSubject.getValue();

// 5. Подписка (в компоненте)
this.userService.users$.subscribe(users => {
  this.users = users;  ← Обновляется когда next() вызывается
});
```

**Тип**: Реактивный, в памяти  
**Скорость**: ⚡ Очень быстро (1ms)  
**Выживает перезагрузку**: ❌ Нет  

---

### **localStorage** 💾

```typescript
// 1. Сохранение
localStorage.setItem('users', JSON.stringify(usersArray));

// 2. Получение
const data = localStorage.getItem('users');

// 3. Парсинг JSON
const users = JSON.parse(data) as IUser[];

// 4. Проверка наличия
if (localStorage.getItem('users')) { /* есть */ }

// 5. Удаление
localStorage.removeItem('users');
localStorage.clear();  // Удалить всё
```

**Тип**: Синхронный, на жестком диске  
**Скорость**: 💾 Медже (10-100ms)  
**Выживает перезагрузку**: ✅ Да  

---

## 🔄 Синхронизация

### **Как их связать?**

```typescript
setUsers(users: IUser[]): void {
  // 1️⃣ Уведомляем подписчиков (в памяти)
  this.usersSubject.next(users);
  
  // 2️⃣ Сохраняем на диск одновременно
  localStorage.setItem('users', JSON.stringify(users));
}
```

**Результат**:
```
┌─────────────────────────────────────┐
│      setUsers() вызывается           │
├─────────────────────────────────────┤
│ ⚡ usersSubject.next()                │
│ └─ Компоненты обновляются МГНОВЕННО │
│                                     │
│ 💾 localStorage.setItem()            │
│ └─ Данные сохраняются НА ДИСК       │
├─────────────────────────────────────┤
│ Результат:                          │
│ ✅ Быстро (BehaviorSubject)         │
│ ✅ Надежно (localStorage)           │
│ ✅ Синхронно (оба одновременно)     │
└─────────────────────────────────────┘
```

---

## 📊 Сравнение

| Свойство | BehaviorSubject | localStorage |
|----------|-----------------|-------------|
| **Хранение** | В памяти (RAM) | На жестком диске |
| **Скорость** | ⚡ Очень быстро | 💾 Медленнее |
| **Реактивность** | ✅ Автоматически уведомляет | ❌ Синхронный |
| **Объем** | Не ограничен (RAM) | ~5-10MB |
| **Выживает перезагрузку** | ❌ Нет | ✅ Да |
| **Использование** | Для подписок | Для постоянства |

---

## 🎯 Типичные операции

### **Добавление пользователя**

```typescript
// Шаг 1: Получить текущих из BehaviorSubject
const current = this.usersSubject.getValue();  // [user1, user2]

// Шаг 2: Добавить нового
const updated = [...current, newUser];  // [user1, user2, user3]

// Шаг 3: Вызвать setUsers() который:
this.setUsers(updated);
  // ├─ BehaviorSubject.next() → ⚡ Компоненты обновляются
  // └─ localStorage.setItem() → 💾 Сохраняется на диск
```

### **Удаление пользователя**

```typescript
// Шаг 1: Получить текущих
const current = this.usersSubject.getValue();  // [u1, u2, u3]

// Шаг 2: Отфильтровать
const updated = current.filter(u => u.id !== deleteUser.id);  // [u1, u3]

// Шаг 3: Обновить оба хранилища
this.setUsers(updated);
```

### **Инициализация (при открытии браузера)**

```typescript
constructor() {
  // Шаг 1: Проверить localStorage
  const stored = localStorage.getItem('users');
  
  if (stored) {
    // Шаг 2: Если есть → загрузить в BehaviorSubject
    const users = JSON.parse(stored);
    this.usersSubject.next(users);
    // ✅ Готово! Данные восстановлены
  } else {
    // Шаг 3: Если нет → загрузить с сервера
    this.loadUsers().subscribe();
  }
}
```

---

## 🧪 Проверка работы

### **В консоли браузера DevTools:**

```javascript
// 1️⃣ Посмотреть localStorage
localStorage

// 2️⃣ Получить конкретное значение
localStorage.getItem('users')

// 3️⃣ Распарсить JSON
JSON.parse(localStorage.getItem('users'))

// 4️⃣ Посмотреть размер
new Blob(Object.values(localStorage)).size  // в байтах

// 5️⃣ Очистить localStorage (осторожно!)
localStorage.clear()
```

---

## 🔌 Интеграция в компоненте

```typescript
export class UsersPageComponent implements OnInit {
  private userService = inject(UserService);
  users: IUser[] = [];

  ngOnInit() {
    // 📡 Подписываемся на Observable (BehaviorSubject)
    this.userService.users$.subscribe((users) => {
      // 🔔 Вызывается когда:
      // 1. Компонент инициализируется (BehaviorSubject отправляет текущее значение)
      // 2. next() вызывается в сервисе
      
      this.users = users;  // Обновляем компонент
    });
  }

  onAddUser(user: IUser) {
    // 🔧 Вызываем сервис
    this.userService.addUser(user);
    // 💪 Сервис:
    // 1. Добавляет в массив
    // 2. Вызывает setUsers()
    // 3. setUsers() вызывает next() + localStorage.setItem()
    // 4. subscribe() получает новое значение
    // 5. this.users обновляется
    // 6. Angular перерендеривает
    // ✅ Готово!
  }
}
```

---

## ⚠️ Частые ошибки

### **Ошибка 1: Забыли подписаться на Observable**

```typescript
// ❌ НЕПРАВИЛЬНО
export class MyComponent {
  users = this.userService.users$;  // Это Observable, не массив!
}

// template
@for (user of users) { /* не будет работать */ }

// ✅ ПРАВИЛЬНО
export class MyComponent {
  users: IUser[] = [];
  
  ngOnInit() {
    this.userService.users$.subscribe(u => {
      this.users = u;  // Теперь это массив!
    });
  }
}

// template
@for (user of users) { /* работает */ }
```

### **Ошибка 2: Не синхронизировать с localStorage**

```typescript
// ❌ НЕПРАВИЛЬНО
setUsers(users: IUser[]): void {
  this.usersSubject.next(users);
  // ❌ localStorage не обновляется!
  // При перезагрузке данные потеряются!
}

// ✅ ПРАВИЛЬНО
setUsers(users: IUser[]): void {
  this.usersSubject.next(users);
  localStorage.setItem('users', JSON.stringify(users));  // ✅
}
```

### **Ошибка 3: Забыли Unsubscribe (утечка памяти)**

```typescript
// ❌ НЕПРАВИЛЬНО (утечка памяти)
ngOnInit() {
  this.userService.users$.subscribe(u => {
    this.users = u;
  });  // Не отписались!
}

// ✅ ПРАВИЛЬНО (способ 1)
private destroy$ = new Subject<void>();

ngOnInit() {
  this.userService.users$
    .pipe(takeUntil(this.destroy$))
    .subscribe(u => {
      this.users = u;
    });
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// ✅ ПРАВИЛЬНО (способ 2: async pipe)
template: `@for (user of userService.users$ | async as users)`
// Angular сам управляет подпиской!
```

---

## 🚀 Лучшие практики

```typescript
// 1️⃣ ВСЕГДА синхронизируйте оба!
setUsers(users) {
  this.subject.next(users);
  localStorage.setItem(...);
}

// 2️⃣ Проверяйте localStorage при инициализации
if (localStorage.getItem('users')) {
  // Загрузить
} else {
  // Запрос на сервер
}

// 3️⃣ Используйте async pipe в шаблоне когда возможно
@for (user of userService.users$ | async)

// 4️⃣ Мержьте данные при обновлении с сервера
loadUsers() {
  return this.api.getUsers().pipe(
    tap(serverUsers => {
      const local = getLocallyAdded();
      const merged = [...serverUsers, ...local];
      this.setUsers(merged);
    })
  );
}

// 5️⃣ Добавляйте обработку ошибок
catchError(err => {
  this.messageService.showError('Ошибка!');
  return of([]);
})
```
