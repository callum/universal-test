export default function resolve (resolver) {
  return Component => class extends Component {
    static resolve = resolver

    componentDidMount () {
      super.componentDidMount(...arguments)
      resolver(this.state.props.dispatch)
    }
  }
}
