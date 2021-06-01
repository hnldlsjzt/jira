# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## 安装 react-cli 内含 typescript

npx create-react-app jira --template typescript

### 项目配置

安装 prettie 用于代码格式化，使用该工具让团队成员代码分隔保持一致，减少冲突
在线地址 https://prettier.io/docs/en/install.html

```
yarn add --dev --exact prettier
```

#### 手动格式化

```
yarn prettier --write .
```

#### 每次 git 提交时格式化

npx mrm lint-staged 或 npx mrm@2 lint-staged

安装完后会在 package.json 中增加 husky、lint-staged

.husky 配置用于 git 提交时钩子检测，并调用 lint-staged 的配置

lint-staged 配置，用于对文件类型进行格式化

由于 create-react-app 默认自带 ESlint，为了防止和 lint-staged 冲突需要安装

```json
yarn add eslint-config-prettier -D
// 接着在pageage.json的selintConfig中增加prettier，用它来覆盖eslist的规则
 "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
```

## 使用 [commitlint](https://github.com/conventional-changelog/commitlint) 来规范 commit 提交

地址：https://github.com/conventional-changelog/commitlint

```
# Install commitlint cli and conventional config
npm install --save-dev @commitlint/{config-conventional,cli}

接着安装Husky 钩子
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

之前版本需要手动在 package.json 中增加 husky 的配置，现在采用最新版本不用这种方式了。在会根目录创建.husky 文件目录，内部包含钩子

一套配置下来，代码提交前会自动格式化且校验 commit 类型检查。

有效减少协同开发格式化问题，且 code review 时能有效快速的看到当次提交了哪些相关内容。

## mock 数据

```shell
// 使用json-server，它遵循REST API规范，使用方法名即可做到增删改查
npm i -g json-server

GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1

// 在根目录下创建db.json数据库,并开启它的监听
json-server --db.json --watch

// 接下来就是使用方法对它做增删改查了
http://localhost:3000/users
post

```

## qs

使用 qs 来简化 get 参数过多拼接的问题

```
// 先安装，如果安装过axios则不需要安装了
yarn add qs
// 转化
qs.stringify(params);
```

## React 相关

```react
<div>
	<Input type="text"/>
</div>
等价于
<div children={<><Input type="text"/></>}/>
得出结论：JSX元素中的子元素，被编译后，其实就是该元素的children元素的值
```

**组件化方式使用 SVG**

通常把 SVG 文件也是使用 `img` 标签来渲染，但这会损失 SVG 的特性。
在 React 中，把 SVG 导入的方式改成大写开头，以组件的形式渲染，就可以使用 SVG 特性，并设置宽高和颜色了。
使用 ReactComponent 来告诉应用程序，这是一个 SVG 组件，而不是它的文件名

```
import { ReactComponent as AsoftwareLogo } from 'assets/software-logo.svg'
```

## Hook 相关

**useContext**

-   useContext()参数为 createContex 对象，并返回该 Context 的值。当前才 Context 值有上层组件中距离当前组件最近的<MyContext.Provider>的 value Prop 决定。 useContext 参数必需是 context 对象，在声明时要不就封装在同一个文件或者把 context 对象存起来，传递下去
-   当上层最近的<MyContext.Provider>更新时，该 Hook 会触发重渲染，并使用最新值。即使祖先使用 React.memo 或 shouldComponentUpdate 也会重新渲染
-   useContext(MyContext)只是让你能够读取 Context 值和订阅 Context 的变化。仍然需要在上层组件树中使用<MyContext.Provider>为下层提供 context

```react
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## 用 Custom Hook 提取并复用代码

**Custom Hook 是 React 中最新也是最优秀的组件代码复用方案**

```react
// useMount,用来简化useEffech依赖值为空，又不想看见代码中空依赖值的情况
export const useMount = (callback)=>{
    useEffect(()=>{
        callback && callback();
    },[])
}

// useDebounce，接收的参数是value和delay，可以很巧妙是把要改变的值放进useDebounce，再在业务组件中的effect中监听useDebounce返回的值
export const useDebounce = (value,delay = 300)=>{
    const [debounceValue,setDebounceValue] = useState(value);
    useEffect(()=>{
        // 每次在value或delay变化后，设置一个定时器
        const timer = setTimeout(()=>{
            setDebounceValue(value);

            // 每次在上一个effect处理完后，执行。
            return ()=>{
                claerTimerout(timer);
            }
        },delay)
    },[value,delay])
    return debounceValue;
}

 // 使用useDebounce来防抖param的值,很巧妙啊
 const [param, setParam] = useState({
        name: '',
        personId: '',
 });
 const debounceParam = useDebounce(param, 500);

 // 当搜索项改变时请求list
 useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(clearObject(debounceParam))}`).then(async (res) => {
            if (res.ok) {
                setList((await res?.json()) || []);
            }
        });
    }, [debounceParam]);

```

## JWT

> JSON Web Tokens

核心在于 token

# TypeScript 相关

## d.ts 文件的意义

相当于 js 给 ts 打的补丁。用于该库或该文件被 ts 识别。

JS 文件 + d.ts 文件 === ts 文件

.d.ts 文件可以让 JS 文件继续维持自己 JS 文件的身份，而拥有 TS 的类型保护。

一般我们写业务代码不会用到，但是点击类型跳转一般会跳转到.d.ts 文件

## 泛型的使用

在不确定入参的参数下使用泛型。例如 useState 就是使用的泛型，不限制入参类型，接收和返回都是同一个类型。

```react
// 在箭头函数中的使用
export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        clear: () => setValue([]),
        add: (item: T) => setValue([...value, item]),
        removeIndex: (index: number) => {
            const arr = [...value]
            arr.splice(index, 1)
            setValue(arr)
        },
    }
};

// 在普通函数中的使用

function useArrays<T>(initialArray: T[]){

}
<T>所在的位置始终在紧挨着形参前面
```

## interface 的使用

> TypeScript 是面向接口编程，而不是面向对象。

**鸭子类型**：只要你的参数符合我的 base 要求，其他多余的参数我就不管了。

```react
interface Iprops {
    users: Users[];
    param: Param;
    setParam: (param: Iprops['param']) => void;// 当方法参数为接口中的参数时的使用方式
}
```

## 函数参数

-   当函数参数有默认值时，参数会变为可选
-   当函数参数有解构时，不能使用?（参数可选符号）

## css in js 如何在项目中组织我们的 css

使用 create-react-app 创建的项目，一般使用两种方式来做自定义配置

-   yarn add @craco/craco（社区方案）
-   [yarn run eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject) （官方提供的命令，把所有内建的配置全部暴露出来）

CSS-in-JS 并不是指某一个具体的库，是指组织 CSS 代码的一种方式，代表库有 style-component 和 emotion

### 传统 CSS 的缺陷

**1.缺乏模块组织**

**2.缺乏作用域**

传统的 CSS 只有一个全局作用域。写一个 class 可以匹配到全局的任意元素。随着项目成长，CSS 会变得越来越难以组织，最终可能会失控。 CSS-in-JS 可以通过生成独特的选择符，来实现作用域的效果。

**3.隐式依赖，让样式难以追踪**

传统的 CSS 很容易在不经意间就污染到其他 HTML 元素，并且还难以追踪（可能元素重名，权重不够导致被影响到）

而 CSS-in-JS 的方法很简单直接

```react
export const Title = styled.h1`
	color:green;
`
<Title>
	我是啥色啊，绿色呀
</Title>
```

**4.没有变量**

传统 CSS 规则是没有变量，但在 CSS-in-JS 中可以很方便的控制变量，甚至可以使用 JS 的条件判断

**5.传统 CSS 和 HTML 耦合**

当想修改 HTML 类名时，响应的 CSS 规则也需要更改

CSS-in-JS 可以只修改一次即可

## Emotion 介绍

安装,需要 2 个库

```
yarn add @emotion/react @emotion/styled
```

vscode 相关插件

```
vscode-styled-components
```

1.传统的 React 的 style 不支持伪类，Emotion 支持
