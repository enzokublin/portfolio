import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  receiveBuddyBearsAndWannabieBuddyBears,
  acceptBuddyBearRequest,
  endbuddybearship
} from "./actions";

class BuddyBearship extends React.Component {
  componentDidMount() {
    console.log("happy running");
    this.props.dispatch(receiveBuddyBearsAndWannabieBuddyBears());
  }
  render() {
    const { buddybears, wannabiebuddybears, dispatch } = this.props;
    console.log("happy props: ", this.props);

    if (!buddybears && !wannabiebuddybears) {
      return null;
    }
    return (
      <div className="BuddyBearOrNot">
        <div className="potbuddybears">
          {this.props.wannabiebuddybears.length > 0 && (
            <div className="wannabiebuddybearstitle">
              <h1 className="buddybearsh1">Buddy Bear Requests</h1>
            </div>
          )}
          {this.props.wannabiebuddybears.length == 0 && (
            <div className="nowannabiebuddybears">
              <h1 className="nowannabiebuddybearsh1">Wannabie Buddy Bears</h1>
            </div>
          )}

          <div className="wannabiebuddybears">
            {this.props.wannabiebuddybears.length > 0 &&
              this.props.wannabiebuddybears.map(wannabiebuddybears => (
                <div
                  className="wannabiebuddybearscontainer"
                  key={wannabiebuddybears.id}
                >
                  <img
                    className="wannabiebuddybearspic"
                    src={wannabiebuddybears.image_url}
                  />
                  <Link to={`/user/${wannabiebuddybears.id}`}>
                    <span>
                      <div className="wannabiebuddybearstext">
                        {wannabiebuddybears.firstname}
                        {wannabiebuddybears.lastname}
                      </div>
                    </span>
                  </Link>
                  <button
                    className="wannabiebuddybearsbutton"
                    onClick={() =>
                      dispatch(acceptBuddyBearRequest(wannabiebuddybears.id))
                    }
                  >
                    Accept Buddy Bearship
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="happybuddybears">
          {this.props.buddybears.length > 0 && (
            <div className="buddybearstitle">
              <h1 className="buddybearsh1">Buddy Bears</h1>
            </div>
          )}
          <div className="buddybearship-box">
            {this.props.buddybears.length > 0 &&
              this.props.buddybears.map(buddybears => (
                <div className="buddybearwannabie-box" key={buddybears.id}>
                  <img
                    className="buddybearwannabie-pic"
                    src={buddybears.image_url}
                  />
                  <div className="buddybearwannabie-text">
                    {buddybears.firstname} {buddybears.lastname}
                  </div>
                  <button
                    className="buddybearwannabie-but"
                    onClick={() => dispatch(endbuddybearship(buddybears.id))}
                  >
                    End Buddy Bearship
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    wannabiebuddybears:
      state.buddybearsAndWannabieBuddyBears &&
      state.buddybearsAndWannabieBuddyBears.filter(
        buddybearOrWannabieBuddybear => !buddybearOrWannabieBuddybear.accepted
      ),
    buddybears:
      state.buddybearsAndWannabieBuddyBears &&
      state.buddybearsAndWannabieBuddyBears.filter(
        buddybearOrWannabieBuddybears => buddybearOrWannabieBuddybears.accepted
      )
  };
};

export default connect(mapStateToProps)(BuddyBearship);
