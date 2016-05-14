/**
 * Created by leichen on 5/9/16.
 */
import { compose,replace,prop,map,sequence,chain,liftN,zip} from 'ramda';
import Maybe from 'data.maybe'
import Task from 'data.task'
import {getJSON} from 'jquery'
import async from 'control.async'
import {curry} from 'lodash';
const concat = curry((x, y) => x.concat(y));


const channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];
//const channels = []
//mconcat:[a] -> a
const mconcat = function(xs, empty) {
    return xs.length ? xs.reduce(concat) : empty();
};


const liftA2 = liftN(2);
//:: a -> bool
const isSomeThing = (x) => {

    if(x == undefined||x == null){
        return Maybe.Nothing
    }

    return (Maybe.Just(x));

}

const Url = String;

const baseUrl = 'https://api.twitch.tv/kraken/{type}/{name}?callback=?'



const Http = {
    //get :: Url-> Task Error JSON
    get: (url) => new Task((rej,res) => getJSON(url).error(rej).done(res))
}

const id = (x) => x




//Trace :: x -> show x
const Trace = (x) => {console.log(x)
                return x
};

const  find =(elt) => {
      return  map(compose(map(prop('_id')),isSomeThing,prop('stream')))(elt)
    }



//makeUrl :: String:type -> String:name -> Url
const makeUrl = curry((t,n) => compose(replace('{type}', t),replace('{name}', n))(baseUrl));

const makeStreamUrl =makeUrl('streams')
const makeChannelUrl =makeUrl("channels")

const extractUrls=compose(map(prop('url_s')),prop('photo'),prop('photos'))

const streamCompose =compose(map(Http.get), map(makeStreamUrl))
//flickrSearch :: String -> Task Error JSON
const StreaSearch = compose( sequence(Task.of),map(Http.get), map(makeStreamUrl))(channels)


const mchain =(fn) =>map(map(fn))

//::(string->Url)->(obj->obj)->(String->Task [Obj])
const makeStream = curry((fnMakeUrl,fnMakeObj)=> {
 return   compose(sequence(Task.of),mchain(fnMakeObj),map(Http.get), map(fnMakeUrl))
})




//::obj->obj
const createStreamObj = (obj) => {

  let retObj = {}
  if(obj){
      switch(obj.stream){
          case null:
              retObj.game = "OffLine"
              retObj.status = "OffLine"
              break

          case undefined:
              retObj.game = "Account Closed"
              retObj.status = "OffLine"

              break
          default:
              retObj.game = obj.stream.game
              retObj.status = "online"
              retObj.desc = obj.stream.status
      }
  }
  return retObj;
}


const createChannelObj = (obj) => {
    let retObj = {
        logo:'https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F',
        display_name:'NA'
    }
    if(obj){
        retObj.logo = obj.logo != null ? obj.logo : 'https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F';

        retObj.display_name = obj.display_name
        retObj.url = obj.url
        retObj.desc =obj.status
    }
    return retObj

}



//::Task [Obj]
const Streams = makeStream(makeStreamUrl)(createStreamObj)(channels);
//::Task [Obj]
const Channels =makeStream(makeChannelUrl)(id)(channels);

//:: [obj,obj]->obj
const mergeArr = (arr) =>{
    let mainObj={};
     mainObj= createChannelObj(arr[1])
    if(arr[0].game == "Account Closed"){
        let displayname = arr[1].message.split("'");
        mainObj.display_name= displayname[1];
    }

    return Object.assign({},mainObj,arr[0]) ;
}
const combinedTask =compose(mchain(mergeArr), liftA2(zip)(Streams))(Channels);


const isOnline = (obj) => obj.status=='online'



export {combinedTask,Streams,id };