import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Online extends React.Component {
  componentDidMount() {
    console.log("mounted props: ", this.props);
  }
  render() {
    console.log("render Online Spice Bears:", this.props);
    const { online } = this.props;
    if (!online) {
      return null;
    }
    return (
      <div className="buddybearbox">
        <h1 className="onlineBears">Online Buddy Bears</h1>
        <div className="buddybears-pending-wannabiebears">
          {this.props.online.map(user => (
            <div className="friendorwannabie-container" key={user.id}>
              <h4 className="spiceBearsh4">
                {user.firstname} {user.lastname}
              </h4>
              <Link to={`/user/${user.id}`} className="bb-link">
                <img className="buddybearimg" src={user.image_url} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    online: state.onlineSpiceBears
  };
};

export default connect(mapStateToProps)(Online);
