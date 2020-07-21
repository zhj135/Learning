import { ToyReact, Component } from './ToyReact'
class MyComponent extends Component{
    render() {
        return <div>
            <span>hello</span>
            <div>
                {true}
                {this.children}
            </div>
        </div>
    }
}


const a = <MyComponent name="a" id="a">
    <div>123</div>
</MyComponent>
ToyReact.render(a, document.body)