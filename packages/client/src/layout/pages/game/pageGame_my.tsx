import { Input, Space, Button, Row, Col } from 'antd'
import { UseDrawField } from '../../../hooks/useDrawField'
import { UseDrawPlayers } from '../../../hooks/useDrawPlayers'
import { UseInitCanvas } from '../../../hooks/useInitCanvas'
import { UseInitImage } from '../../../hooks/useInitImage'
import { UseDrawCards } from '../../../hooks/useDrawCards'
// import { UseHandler } from '../../../hooks/useHandler'
import { UseGameCore } from '../../../hooks/useGameCore'
import { useEffect } from 'react'
import {
  inputContainer,
  actionContainer,
  sliderVertical,
  sliderVerticalContainer,
} from '../../../assets/pageGameStyle'
import { UseDrawContent } from '../../../hooks/useDrawContent'
import { getApiPlayersInfo } from '../../../components/game/testData'
import { roundedRectPath, writeLogin } from '../../../components/game/lib'
import {
  gameContent,
  gameSettings,
  typographySettings,
} from '../../../constants/game'
import './game.css'

export const PageGame = () => {
  // const { Title } = Typography
  // состояния будут перенесены в глобальное хранилице

  const {
    isStartGame,
    setIsStartGame,
    setSelectedCard,
    selectedCard,
    visibleField,
    animationField,
    setAnimationField,
    setVisibleField,
    gameStep,
    setGameStep,
    setNextGameStep,
    setPlayersInfo,
    playersInfo,
    raundInfo,
  } = UseGameCore()
  const { ctx, clearCanvas, ctx2, clearCanvas2, ctx3, canvas3 } =
    UseInitCanvas()
  const { setPlace, fieldsElement } = UseDrawField(ctx)
  const { cardsElement, setCardsElement } = UseInitImage()

  const { generatePlayers } = UseDrawPlayers(
    ctx2,
    fieldsElement,
    animationField
  )
  const { drawCard } = UseDrawCards(
    ctx2,
    cardsElement,
    setCardsElement,
    setSelectedCard
  )
  // const { addClick, removeClick } = UseHandler(canvas2)
  const { writeTitle, writeTask, writeText, displayContent } =
    UseDrawContent(ctx)
  //==============
  const ClearScreen = () => {
    clearCanvas()
    clearCanvas2()
  }

  // ===================== CONTENT
  // Посмотреть игровое поле
  const gameBoad = () => {
    setVisibleField(true)
    setAnimationField(true)
    setPlace()
    generatePlayers()
    writeTitle('Игровое поле')
    writeLogin(
      ctx,
      playersInfo,
      raundInfo,
      20,
      gameSettings.GAME_BOARD_TOP_PX + 80
    )
  }
  const stepStart = () => {
    // обнулить переменные раунда
    setVisibleField(false)
    setIsStartGame(true)
    setSelectedCard(null)
    writeTitle(gameContent[gameStep].title)
    writeTask(gameContent[gameStep].task)

    setPlayersInfo(getApiPlayersInfo) // получаем данные о игроках getApiPlayersInfo
  }
  const stepAssociation = () => {
    displayContent(gameStep)
  }
  const stepCards = () => {
    displayContent(gameStep)
  }
  const stepVoting = () => {
    displayContent(gameStep)
  }
  const stepScoring = () => {
    displayContent(gameStep)
    console.log('cardsElement', cardsElement)
    // drawCards()
    writeText('Ведущего', gameSettings.CARD_TOP_PX - 60)
    drawCard(
      cardsElement[0].img,
      gameSettings.CONTENT_LEFT_PX + gameSettings.CARD_LEFT_PX,
      gameSettings.CARD_TOP_PX
    )
    writeText('Логин 1', 440)
    drawCard(
      cardsElement[1].img,
      gameSettings.CONTENT_LEFT_PX + gameSettings.CARD_LEFT_PX,
      500
    )
  }
  const stepResults = () => {
    setAnimationField(true)
    setPlace()
    generatePlayers()
    displayContent(gameStep)
    writeTitle(gameContent[gameStep].title)
    writeTask(gameContent[gameStep].task)

    writeLogin(
      ctx,
      playersInfo,
      raundInfo,
      20,
      gameSettings.GAME_BOARD_TOP_PX + 80
    )
  }
  const stepFinish = () => {
    writeTitle('Финал')
  }
  // ===================== Steps ROUTER
  const routerGame = () => {
    console.log('routerGame step', gameStep)
    setAnimationField(false)
    if (!visibleField) {
      switch (gameStep) {
        case 'association':
          stepAssociation()
          break
        case 'cards':
          stepCards()
          break
        case 'voting':
          stepVoting()
          break
        case 'scoring':
          stepScoring()
          break
        case 'results':
          stepResults()
          break
        case 'finish':
          stepFinish()
          break
        default:
          stepStart()
      }
    } else {
      gameBoad()
    }
  }

  // ===================== Кнопки
  // Вернуться к игре
  const ReturnToGame = () => {
    ClearScreen()
    setVisibleField(false)
  }

  function buttonMenu(
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement | null,
    str: string,
    imageX: number,
    imageY: number,
    imageWidth: number,
    imageHeight: number
  ) {
    if (!ctx) {
      return
    }
    if (!canvas) {
      return
    }
    ctx.save()
    ctx.fillStyle = 'red'
    ctx.fill(
      new Path2D(roundedRectPath(imageX, imageY, imageWidth, imageHeight, 30))
    )
    ctx.font = `${typographySettings.text.fontSize}px ${typographySettings.text.fontFamily}`
    //- ---
    ctx.fillStyle = typographySettings.text.color
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillText(str, imageX + imageWidth / 2, imageY + imageHeight / 2)
    ctx.restore()
    // ---
    canvas.addEventListener(
      'click',
      (event: any) => {
        const isClickedInsideImage =
          event.offsetX >= imageX &&
          event.offsetX <= imageX + imageWidth &&
          event.offsetY >= imageY &&
          event.offsetY <= imageY + imageHeight

        if (isClickedInsideImage) {
          setVisibleField(!visibleField)
        }
      },
      false
    )
  }

  // --------------
  /*
  useEffect(() => {
    if (isStartGame) {
      addClick(animateCards)
    } else {
      removeClick(animateCards)
    }
  }, [isStartGame])
  */

  // -------------- РОУТИНГ
  useEffect(() => {
    if (!visibleField) {
      setAnimationField(false)
    }
    ClearScreen()
    let str = 'Игровое поле'
    if (visibleField) {
      str = 'Вернуться к игре'
    }
    buttonMenu(
      ctx3,
      canvas3,
      str,
      gameSettings.CANVAS_WIDTH_PX - 175,
      5,
      170,
      40
    )

    routerGame()
  }, [gameStep, visibleField])

  // --------------
  return (
    <div className="content">
      {/*<Title>Cтраница игры</Title>*/}
      <Space style={inputContainer}>
        {selectedCard && <Input placeholder="Напишите ассоциацию" />}
      </Space>
      <div
        className="layers"
        style={{
          width: gameSettings.CANVAS_WIDTH_PX,
          height: gameSettings.CANVAS_HEIGHT_PX,
        }}>
        <canvas
          id="canvas"
          className="layer"
          width={gameSettings.CANVAS_WIDTH_PX}
          height={gameSettings.CANVAS_HEIGHT_PX}
          style={{
            border: '1px solid black',
          }}></canvas>

        <canvas
          id="canvas2"
          className="layer layer2"
          width={gameSettings.CANVAS_WIDTH_PX}
          height={gameSettings.CANVAS_HEIGHT_PX}></canvas>
        <canvas
          id="canvas3"
          className="layer layer3"
          width={gameSettings.CANVAS_WIDTH_PX}
          height={gameSettings.CANVAS_HEIGHT_PX}></canvas>
      </div>

      <Row className="w100">
        <Col span={8} offset={8}>
          {isStartGame ? (
            <>
              {visibleField ? (
                <Button onClick={ReturnToGame} className="success">
                  Вернуться к игре
                </Button>
              ) : (
                <>
                  <Button onClick={setNextGameStep}>
                    Следующий шаг (для режима разработки)
                  </Button>
                  <Button
                    onClick={() => {
                      setGameStep('results')
                    }}>
                    Для проверки: шаг Подведение итогов
                  </Button>
                </>
              )}
            </>
          ) : (
            <Button
              onClick={() => {
                setGameStep('start')
              }}>
              Начать игру
            </Button>
          )}
        </Col>
      </Row>

      <Row className="w100 mb-footer">
        <Col span={8} className="text-left">
          {isStartGame ? (
            <Button
              onClick={() => {
                setGameStep('start')
              }}>
              Перезапустить игру
            </Button>
          ) : (
            <Button
              onClick={() => {
                setGameStep('start')
              }}>
              Начать игру
            </Button>
          )}
        </Col>

        <Col span={8} offset={8} className="text-right">
          {visibleField ? (
            <Button onClick={ReturnToGame}>Вернуться к игре</Button>
          ) : (
            <>
              <Button onClick={gameBoad}>Посмотреть игровое поле</Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}
