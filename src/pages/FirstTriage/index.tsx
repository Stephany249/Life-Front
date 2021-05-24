import React, { useCallback } from 'react';
import Button from '../../components/Button';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import triageImg from '../../assets/FirstTriage/Triage.png';


import { AlignButton, AlignText, ContainerImage, Content, SubTitle, Title } from './styles';

const FirstTriage: React.FC = () => {
    const navigation = useNavigation();
    const navigateMenu = useCallback(() => {
      navigation.dispatch(DrawerActions.openDrawer())
    }, []);

    return (
        <Content>

            <ContainerImage>
                <Image source={triageImg} />
            </ContainerImage>

            <AlignText>
                <Title>Que ótimo que você está buscando uma ajuda!</Title>

                <SubTitle>Seu próximo passo será responder umas perguntinhas para que possamos lhe ajudar da melhor forma possível ;)</SubTitle>
            </AlignText>

            <AlignButton>
                <Button 
                    onPress={
                        () => {navigation.navigate('TriageClient')}
                    }
                >
                    Próximo
                </Button>
            </AlignButton>
        
        </Content>
    )
}
  
export default FirstTriage;
  





