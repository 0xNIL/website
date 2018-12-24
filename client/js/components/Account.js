const config = require('../config')


class Account extends React.Component {


  link(appNickname, username) {
    if (appNickname === 'twitter')
      return `https://twitter.com/${username}`
    else
      return `https://www.reddit.com/user/${username}`
  }

  render() {

    const data = this.props.data

    return (
    <div style={{padding: '10px 0', clear: 'all'}}>{
      data ?
      <div>
        <i className={`fab fa-${data.appNickname}`} style={{
          fontSize: 50,
          color: '#ddd',
          float: 'left',
          marginRight: 32
        }}></i> <img src={data.avatar} style={{
          float: 'left',
          borderRadius: 40,
          width: 50,
          height: 50,
          marginRight: 16
        }}/>
        {data.name}<br/>
        <a href={config.profileOnApp[data.appNickname](data.username)} style={{color: 'black'}}
           target='_blank'>{config.decoration[data.appNickname]}{data.username}</a>
      </div>
      : null
    }
    </div>
    )
  }
}

export default Account