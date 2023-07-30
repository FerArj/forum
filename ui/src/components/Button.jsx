import styled from 'styled-components'

const ContainerButton = styled.div`
    margin: auto;
    margin-top: 2vh;
    & button{
        background-color: blue;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
    }
`

function button ({onClick, children}) {
    return (
        <ContainerButton>
            <button onClick={onClick}>{children}</button>
        </ContainerButton> 
    )   
}

export default button;