  Архитектура приложения: Feature-Based + Core/Shared
Feature-Based с Core/Shared, потому что проект естественно делится на функциональные области. Общую инфраструктуру вынес в core, переиспользуемые компоненты в shared.

Архитектура компонентов: Smart/Dumb Components + Facade Pattern
Состояние: RxJS
Методология: OOD - через объекты, сервисы, интерфейсы

Я выбрал архитектуру Feature-Based с подходом core/shared, потому что приложение естественно делится на функциональные области. Общую инфраструктуру вынес в core, переиспользуемые компоненты и директивы — в shared, а функциональные области — в features. Для компонентов использован подход Smart/Dumb: Smart-компоненты работают с данными, Dumb-компоненты отвечают только за отображение UI. Бизнес-логика вынесена в фасады, если они используются.
В качестве методологии выбрано OOD, как наиболее естественный подход для объектной структуры Angular
Структура проекта после рефакторинга такая: src/app/core (guards, interceptors, services), shared (components, directives), features/auth и features/posts, плюс app.component.ts, app.config.ts, app.routes.ts

SRC\APP
│   app.component.html
│   app.component.scss
│   app.component.ts
│   app.config.ts
│   app.routes.ts
│   training.ts
│   
├───core
│   ├───components
│   │   ├───footer
│   │   │       footer.component.html
│   │   │       footer.component.scss
│   │   │       footer.component.ts
│   │   │       
│   │   ├───header
│   │   │       header.component.html
│   │   │       header.component.scss
│   │   │       header.component.ts
│   │   │       
│   │   ├───loader
│   │   │       loader.component.html
│   │   │       loader.component.scss
│   │   │       loader.component.ts
│   │   │       
│   │   └───message
│   │           message.component.html
│   │           message.component.scss
│   │           message.component.ts
│   │           
│   ├───interceptors
│   │       http-error-interceptor.ts
│   │       logging-interceptor.ts
│   │       
│   └───services
│           language.service.ts
│           loader.service.ts
│           local-storage.service.ts
│           message.service.ts
│           theme.service.ts
│           
├───features
│   ├───auth
│   │   │   auth.interceptor.ts
│   │   │   UserRole.ts
│   │   │   
│   │   ├───auth
│   │   │       auth.component.html
│   │   │       auth.component.scss
│   │   │       auth.component.ts
│   │   │       
│   │   ├───guards
│   │   │       admin.guard.ts
│   │   │       auth.guard.ts
│   │   │       
│   │   ├───interfaces
│   │   │       IAuthResponse.ts
│   │   │       IAuthToken.ts
│   │   │       IAuthUser.ts
│   │   │       
│   │   └───services
│   │           auth.service.ts
│   │           
│   ├───home
│   │       home.component.html
│   │       home.component.scss
│   │       home.component.ts
│   │       
│   ├───homework-28
│   │   ├───change-detection-default
│   │   │       change-detection-default.component.html
│   │   │       change-detection-default.component.scss
│   │   │       change-detection-default.component.ts
│   │   │       
│   │   ├───change-detection-on-push
│   │   │       change-detection-on-push.component.html
│   │   │       change-detection-on-push.component.scss
│   │   │       change-detection-on-push.component.ts
│   │   │       
│   │   ├───child
│   │   │       child.component.html
│   │   │       child.component.scss
│   │   │       child.component.ts
│   │   │       
│   │   └───parent
│   │           parent.component.html
│   │           parent.component.scss
│   │           parent.component.ts
│   │           
│   ├───not-found
│   │       not-found.component.html
│   │       not-found.component.scss
│   │       not-found.component.ts
│   │       
│   ├───posts
│   │   │   post.resolver.ts
│   │   │   posts-routing.module.ts
│   │   │   
│   │   ├───interfaces
│   │   │       IPost.ts
│   │   │       IPostResponse.ts
│   │   │       
│   │   ├───post-create
│   │   │       post-create.component.html
│   │   │       post-create.component.scss
│   │   │       post-create.component.ts
│   │   │       
│   │   ├───post-detail
│   │   │       post-detail.component.html
│   │   │       post-detail.component.scss
│   │   │       post-detail.component.ts
│   │   │       
│   │   ├───post-edit-dialog
│   │   │       post-edit-dialog.component.html
│   │   │       post-edit-dialog.component.scss
│   │   │       post-edit-dialog.component.ts
│   │   │       
│   │   ├───posts
│   │   │       posts.component.html
│   │   │       posts.component.scss
│   │   │       posts.component.ts
│   │   │       
│   │   └───services
│   │           post-api.service.ts
│   │           post-store.service.ts
│   │           
│   └───users
│       ├───create-user
│       │       create-user.component.html
│       │       create-user.component.scss
│       │       create-user.component.ts
│       │       
│       ├───directives
│       │       hover-border.directive.ts
│       │       hover.directive.ts
│       │       
│       ├───enums
│       │       PhoneMode.ts
│       │       
│       ├───interfaces
│       │       IGradientConfiguration.ts
│       │       IPhoneMode.ts
│       │       IUser.ts
│       │       
│       ├───pipes
│       │       custom-plural.pipe.ts
│       │       phone-numbers.pipe.ts
│       │       
│       ├───services
│       │       phone-modes.service.ts
│       │       user-api.service.ts
│       │       user.service.ts
│       │       
│       ├───user-card
│       │       user-card.component.html
│       │       user-card.component.scss
│       │       user-card.component.ts
│       │       
│       ├───users-filter
│       │       users-filter.component.html
│       │       users-filter.component.scss
│       │       users-filter.component.ts
│       │       
│       └───users-page
│               users-page.component.html
│               users-page.component.scss
│               users-page.component.ts
│               
└───shared
    ├───enums
    │       Color.ts
    │       HttpStatusDescription.ts
    │       Language.ts
    │       MessageType.ts
    │       Theme.ts
    │       
    └───interfaces
            IAppConfig.ts
            IDestination.ts
            IMessage.ts
            IMessenger.ts
            INavItem.ts
            IPhotoReport.ts
            IRoute.ts
            IService.ts
            IThemeOptions.ts
            ITourForm.ts
            ITravelBlog.ts
            ITravelEssential.ts
            