import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ProgressBar, Colors } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

export function TutorialModal(props) {

    const randomSel = (array) => {
        const filteredArray = array.filter(item => item.answered == false);
        if (filteredArray.length>0){
            const shuffleNfilteredA = filteredArray.sort(function() {return .5 - Math.random();});
            return shuffleNfilteredA[0]
        }
    }

    const cleanUp = (text) => {
        while (text.indexOf(".")!=-1){ text = text.replace(".","");}
        while (text.indexOf(",")!=-1){ text.replace(",",""); }
        return text.toLowerCase();
    }

    const reset = () => {

        for (let i=0;i<props.data.length;i++){
            props.data[i].answered=false;
        }
        
        setQuestion( randomSel( props.data ) );
        onChangeText('');
        setAnswer('');
        setcheckButtonValue('SUBMIT');
        setProgress(0.0);

    }

    const checkIt = () =>{

        console.log("here1")

        if (checkButtonValue=="SUBMIT"){

            let valueStripped = cleanUp( value );
            let answerStripped = cleanUp(question.english );
            
            if (valueStripped==answerStripped){

                setAnswer( "Correct! The Answer is: " + question.english )
                setcheckButtonValue("NEXT")

                for ( let i=0; i<data.length;i++ ){
                    console.log( data[i].latin )
                    if (question.latin==data[i].latin){ 
                        console.log("here")
                        data[i].answered=true }
                }
            
            }
            else { 
                setAnswer( "No, the answer actually is: " + question.english );
                setcheckButtonValue("NEXT");
            }

        }
        else if (checkButtonValue=="NEXT"){

            setQuestion( randomSel( data ) );
            setAnswer('');
            setcheckButtonValue("SUBMIT");
            onChangeText('');

            console.log( data )
            
            let filteredArrayCheck = data.filter(item => item.answered == false);
            
            console.log( filteredArrayCheck.length,data.length )

            setProgress( (data.length - filteredArrayCheck.length) / data.length )
        }
    }

    let data = props.data;
    const [question, setQuestion] = useState( {latin:"",english:""} );
    const [value, onChangeText] = useState('');
    const [answer, setAnswer] = useState('');
    const [progress, setProgress] = useState(0.0);
    const [checkButtonValue, setcheckButtonValue] = useState("SUBMIT");

    if (progress!=1.0){
        return (
            <Modal style={styles.modal} onShow={reset} visible={props.modalState}>
                
                <View style={styles.topBar}>
                    <TouchableOpacity style={{padding:12,}}onPress={props.func} >
                        <Entypo name="cross" size={34} color="black" />
                    </TouchableOpacity>
    
                    <View style={styles.progressBar}>
                    <ProgressBar progress={ progress } color={Colors.red800} />
                    </View>
                
                </View>
                
                <View style={styles.containerInModal}>
    
                    <View style={styles.translationTextContainer}>
                        <Text style={styles.header}>Write this in English</Text>
                        <Text style={styles.translationText} >{ question.latin!= "" ? question.latin : ""}</Text>
                        <Text style={{ margin: 12, textAlign:"center"}}>{answer}</Text>
                    </View>
    
                    <TextInput style={styles.input}
                               theme={ { colors: { primary: "#1d3557"} } }
                               mode='outlined'
                               underlineColor="blue"
                               onChangeText={text => onChangeText(text)}
                               label="Type English here..."
                               value={value} />
                    
                    <TouchableOpacity onPress={ checkIt }>
                        <View style={ styles.button }>
                            <Text  style={ styles.buttonText }>{checkButtonValue}</Text>
                        </View>
                    </TouchableOpacity>
    
                
                </View>
            
            </Modal>
        );
    }
    
    else if (progress==1.0) {
        return (
            <Modal style={styles.modal} onShow={reset} visible={props.modalState}>
                
                <View style={styles.topBar}>
                    <TouchableOpacity style={{padding:12,}} onPress={ props.func } >
                        <Entypo name="cross" size={34} color="black" />
                    </TouchableOpacity>
    
                    <View style={styles.progressBar}>
                    <ProgressBar progress={ progress } color={Colors.red800} />
                    </View>
                
                </View>
                
                <View style={styles.containerInModal}>
    
                    <View style={styles.translationTextContainer}>
                        <Text style={styles.header}>Congrats! You're all done!</Text>
                    </View>
                    
                    <TouchableOpacity onPress={ props.func }>
                        <View style={ styles.button }>
                            <Text  style={ styles.buttonText }>FINISH</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            
            </Modal>
        );

    }

}


export default function App(props) {
    const [modalVisible, setModalVisible] = useState(false);

    const Press = () => {
        if (modalVisible==false){
          setModalVisible(true);
        }
        if (modalVisible==true){
          setModalVisible(false);
        }
      }

return (
    <React.Fragment>
    <View style={styles.container}>

        <TutorialModal modalState={modalVisible} data={props.data} func={Press}/>

        <TouchableOpacity onPress={ Press }>
            <View style={ styles.modalActivateButtonContainer }>
                <Text style={styles.activateModalButtonText} >MODAL</Text>
            </View>
        </TouchableOpacity>
  
    </View>


</React.Fragment>
  );

}

const styles = StyleSheet.create({

    containerInModal:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white",
        },

    topBar:{
        flexDirection: "row",
        justifyContent: "space-between"

    },

    progressBar: {
        flex:1,
        justifyContent: "center",
        marginTop: 5,
        marginLeft: 20,
        marginRight: 30,
    },

    input:{
        backgroundColor: "#d3d3d3",
        height: 75,
        width: 320,
        margin: 20,
        paddingLeft: 10,
        borderRadius: 8,
        color: "grey",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        borderColor: "blue"
    },

    translationTextContainer:{
        margin: 20,
        borderColor: "blue"
    },

    translationText:{
        fontSize: 14,
        fontStyle: "italic",
        margin: 20,
        textAlign: "center"

    },

    button: {
        marginVertical: 14,
        backgroundColor:'#ecf0f1',
        //backgroundColor: "#457b9d",
        //backgroundColor: "#f1faee",
        //backgroundColor: "#1d3557",
        margin: 8,
        paddingLeft: 30,
        paddingRight: 30,
        padding: 14,
        borderRadius: 4,
        borderColor: "#1d3557",
        borderWidth: 2,
      },

      buttonText: {
        textAlign: "center",
        color: "#1d3557",
        //color: "white",
      },

      header: {
          fontSize: 20,
          fontWeight: "bold",
      },

      modalActivateButtonContainer:{
        backgroundColor:'#ecf0f1',
        paddingLeft: 30,
        paddingRight: 30,
        padding: 14,
        borderRadius: 4,
        borderColor: "#1d3557",
        borderWidth: 2,

      },

      activateModalButtonText:{
        textAlign: "center",
        color: "#1d3557",
      }
    

});