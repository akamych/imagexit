import { Input, Space, Button, Slider, Row, Col } from 'antd'
import { UseDrawField } from '../../../hooks/useDrawField'
import { UseDrawPlayers } from '../../../hooks/useDrawPlayers'
import { UseInitCanvas } from '../../../hooks/useInitCanvas'
import { UseInitImage } from '../../../hooks/useInitImage'
import { UseDrawCards } from '../../../hooks/useDrawCards'
import { UseGameCore } from '../../../hooks/useGameCore'
import { useEffect } from 'react'
import {
  inputContainer,
  actionContainer,
  sliderVertical,
  sliderVerticalContainer,
} from '../../../assets/pageGameStyle'
import { UseMusic } from '../../../hooks/useMusic'
import { musicSettings } from '../../../constants/common'
import { UseDrawContent } from '../../../hooks/useDrawContent'
import { getApiPlayersInfo } from '../../../components/game/testData'
import { roundedRectPath, writeLogin } from '../../../components/game/lib'
import {
  gameContent,
  gameSettings,
  typographySettings,
} from '../../../constants/game'
import './game.css'
import { FullscreenOutlined } from '@ant-design/icons'

export const PageGame = () => {
  // состояния будут перенесены в глобальное хранилице

  const {
    isStartGame,
    setIsStartGame,
    setSelectedCard,
    selectedCard,
    visibleField,
    setVisibleField,
    fullScreen,
    animationField,
    setAnimationField,
    gameStep,
    setGameStep,
    setNextGameStep,
    setPlayersInfo,
    playersInfo,
    raundInfo,
  } = UseGameCore()

  const { playMusic, setPlayMusic, startMusic, stopMusic, setMusicVolume } =
    UseMusic()

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

  const { writeTitle, writeTask, writeText, displayContent } =
    UseDrawContent(ctx)
  // ---
  const ClearScreen = () => {
    clearCanvas()
    clearCanvas2()
  }
  // ===================== CONTENT

  // ----- Посмотреть игровое поле
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

  // ----- Шаг: Новая игра
  const stepStart = () => {
    // обнулить переменные раунда
    setPlayersInfo(getApiPlayersInfo) // получаем данные о игроках getApiPlayersInfo
    setIsStartGame(true)
    setVisibleField(false)
    setSelectedCard(null)
    writeTitle(gameContent[gameStep].title)
    writeTask(gameContent[gameStep].task)
  }

  // ----- Шаг: Ведущий придумывает ассоциацию
  const stepAssociation = () => {
    displayContent(gameStep)
  }

  // ----- Шаг: Выбор карты для ассоциации
  const stepCards = () => {
    displayContent(gameStep)
  }

  // ----- Шаг: Голосование
  const stepVoting = () => {
    displayContent(gameStep)
  }

  // ----- Шаг: Подсчет голосов
  const stepScoring = () => {
    displayContent(gameStep)
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

  // ----- Шаг: Результаты раунда
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

  // ----- Шаг: Окончание игры
  const stepFinish = () => {
    writeTitle('Финал')
  }

  // ===================== ROUTER
  const routerGame = () => {
    setAnimationField(false)
    if (!visibleField) {
      switch (gameStep) {
        case 'start':
          stepStart()
          break
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

  // -------------- РОУТИНГ
  useEffect(() => {
    if (!visibleField) {
      setAnimationField(false)
    }
    ClearScreen()
    routerGame()
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
  }, [gameStep, visibleField, isStartGame])

  useEffect(() => {
    routerGame()
  }, [])

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  const togglePlayMusic = () => {
    setPlayMusic(prev => !prev)
    if (playMusic) {
      stopMusic()
    } else {
      startMusic()
    }
  }

  return (
    <>
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
        <Space style={actionContainer}>
          <Button onClick={toggleFullScreen}>
            <FullscreenOutlined rev={undefined} />
            {fullScreen ? <>Закрыть</> : <>Открыть</>} &nbsp;полноэкранный режим
          </Button>
          <div style={sliderVerticalContainer}>
            <Button onClick={togglePlayMusic}>
              {playMusic ? <>Выключить</> : <>Включить</>} &nbsp; музыку
            </Button>
            {playMusic && (
              <div style={sliderVertical}>
                <Slider
                  vertical
                  defaultValue={musicSettings.MUSIC_INIT_VOLUME}
                  onChange={setMusicVolume}
                />
              </div>
            )}
          </div>
        </Space>
      </div>
    </>
  )
}
