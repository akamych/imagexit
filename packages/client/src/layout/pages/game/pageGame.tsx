import { Input, Space, Button, Slider, Row, Col, Modal } from 'antd'
import { UseDrawField } from '../../../hooks/useDrawField'
import { UseDrawPlayers } from '../../../hooks/useDrawPlayers'
import { UseInitCanvas } from '../../../hooks/useInitCanvas'
import { UseInitImage } from '../../../hooks/useInitImage'
import { UseDrawCards } from '../../../hooks/useDrawCards'
import { UseHandler } from '../../../hooks/useHandler'
import { UseGameCore } from '../../../hooks/useGameCore'
import { useEffect, useState } from 'react'
import { inputContainer, actionContainer, sliderVertical, sliderVerticalContainer } from '../../../assets/pageGameStyle'
import { UseMusic } from '../../../hooks/useMusic'
import { musicSettings } from '../../../constants/common'
import { UseDrawContent } from '../../../hooks/useDrawContent'
import { getApiPlayersInfo, getApiRaundInfo, getPlayersJSON } from '../../../components/game/testData'
import { buttonCanvas, roundedRectPath, writeLogin, writeLoginFinish } from '../../../components/game/lib'
import { gameContent, gameSettings, typographySettings, MAX_ROUND_SCORE } from '../../../constants/game'
import './game.css'
import { FullscreenOutlined } from '@ant-design/icons'
import { WgameStepStart } from '../../../components/game/WgameStepStart'
import { IPlayerInfo, defaultRaundInfo } from '../../../types/game'
import { useSetScore } from '../../../hooks/useSetScore'

export const PageGame = () => {
  //const { Title } = Typography
  // состояния будут перенесены в глобальное хранилице

  const { isStartGame, setIsStartGame, setSelectedCard, selectedCard, visibleField, setVisibleField, fullScreen, animationField, setAnimationField, gameStep, setGameStep, setNextGameStep, setPlayersInfo, playersInfo, raundInfo, setRaundInfo, difficulty, setDifficulty } = UseGameCore()

  const { playMusic, setPlayMusic, startMusic, stopMusic, setMusicVolume } = UseMusic()

  const { ctx, clearCanvas, ctx2, clearCanvas2, ctx3, canvas3, clearCanvas3 } = UseInitCanvas()
  const { setPlace, fieldsElement } = UseDrawField(ctx)
  const { cardsElement, setCardsElement } = UseInitImage()
  const { generatePlayers } = UseDrawPlayers(ctx2, fieldsElement, animationField)
  const { drawCards, animateCards, drawCard } = UseDrawCards(ctx3, cardsElement, setCardsElement, setSelectedCard, gameStep)
  const { addClick, removeClick } = UseHandler(canvas3)
  const { writeTitle, writeTask, writeText, writeSrting, displayContent } = UseDrawContent(ctx)
  // ==============
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [finished, setFinished] = useState(false)
  const updateScore = useSetScore()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const сloseModal = () => {
    setIsModalOpen(false)
  }

  // ==============
  const ClearScreen = () => {
    clearCanvas()
    clearCanvas2()
    clearCanvas3()
  }
  // ===================== CONTENT
  // Посмотреть игровое поле
  const gameBoad = () => {
    setVisibleField(true)
    setAnimationField(true)
    setPlace()
    generatePlayers()
    writeTitle('Игровое поле')
    const { playerJSON, pointsJSON } = getPlayersJSON(7) // тестовые данные
    writeLogin(ctx, playerJSON, pointsJSON, 20, gameSettings.GAME_BOARD_TOP_PX + 80)
  }
  // ====================== START
  const stepStart = () => {
    //setPlayersInfo(getApiPlayersInfo) // получаем данные о игроках getApiPlayersInfo
    setIsStartGame(false)
    const left = gameSettings.CONTENT_LEFT_PX
    writeTitle(gameContent[gameStep].title)
    writeTask(gameContent[gameStep].task)
    writeSrting('Уровень сложности: ' + difficulty, typographySettings.smallText.color, left, gameSettings.GAME_BOARD_TOP_PX + 40)
    writeSrting('Команда: (от 3 до 7)', typographySettings.smallText.color, left, gameSettings.GAME_BOARD_TOP_PX + 70)
    writeLogin(ctx, playersInfo, null, left + 30, gameSettings.GAME_BOARD_TOP_PX + 100)
    buttonModal(ctx3, canvas3, 'Выбрать', gameSettings.CONTENT_WIDTH_PX, gameSettings.GAME_BOARD_TOP_PX + 40, 170, 40)
    if (difficulty != null && playersInfo.length > 2 && playersInfo.length <= 7) {
      buttonCanvas(ctx3, canvas3, 'red', 'играть', '#fff', typographySettings.title.offset.left, gameSettings.GAME_BOARD_TOP_PX + 320, 170, 40, setNextGameStep)
    }

    setFinished(false)
  }
  // ---- будет сохраняться в глобальном стейте
  const startSettingsSave = (team: IPlayerInfo[], difficultyInput: string) => {
    console.log('teamSave', team)
    setPlayersInfo(team)
    setDifficulty(difficultyInput)
    ClearScreen()
  }
  // ===============================
  const stepAssociation = () => {
    // тестовые данные
    // const { playerJSON, pointsJSON } = getPlayersJSON()
    // setPlayersInfo(playerJSON)
    // setRaundInfo(pointsJSON)

    // setPlayersInfo(getApiPlayersInfo) // получаем данные о игроках getApiPlayersInfo
    setIsStartGame(true)
    displayContent(gameStep)
    setFinished(false)
  }
  const stepCards = () => {
    displayContent(gameStep)
    drawCards()
  }
  const stepVoting = () => {
    displayContent(gameStep)
    drawCards()
    //addClick(animateCards)
    /*
    cardsElement.forEach(card => {
       drawCard(card.img, card.left, card.top)
    })
    */
  }
  const stepScoring = () => {
    displayContent(gameStep)
    console.log('cardsElement', cardsElement)
    // drawCards()
    writeText('Ведущего', gameSettings.CARD_TOP_PX - 60)
    drawCard(cardsElement[0].img, gameSettings.CONTENT_LEFT_PX + gameSettings.CARD_LEFT_PX, gameSettings.CARD_TOP_PX)
    writeText('Логин 1', 440)
    drawCard(cardsElement[1].img, gameSettings.CONTENT_LEFT_PX + gameSettings.CARD_LEFT_PX, 500)
  }
  const stepResults = () => {
    setAnimationField(true)
    setPlace()
    generatePlayers()
    displayContent(gameStep)
    writeTitle(gameContent[gameStep].title)
    writeTask(gameContent[gameStep].task)
    const { playerJSON, pointsJSON } = getPlayersJSON(7) // тестовые данные
    writeLogin(ctx, playerJSON, pointsJSON, 20, gameSettings.GAME_BOARD_TOP_PX + 80)
  }
  const stepFinish = () => {
    setAnimationField(false)
    setPlayersInfo(getApiPlayersInfo(7)) // получаем данные о игроках getApiPlayersInfo
    setRaundInfo(getApiRaundInfo(7))
    setIsStartGame(false)
    writeTitle('Финал')
    writeLoginFinish(ctx, playersInfo, raundInfo, gameSettings.CANVAS_WIDTH_PX / 2 - 80, gameSettings.GAME_BOARD_TOP_PX)
    buttonCanvas(ctx3, canvas3, 'yellow', 'Еще партейку, пожалуй', '#000', gameSettings.CANVAS_WIDTH_PX / 2 - 100, gameSettings.CANVAS_HEIGHT_PX - 200, 200, 40, ReturnToGame)

    // Generate last score
    updateScore(Math.floor(Math.random() * (MAX_ROUND_SCORE + 1)))
  }
  // ===================== Steps ROUTER
  const routerGame = () => {
    console.log('routerGame step', gameStep)
    ClearScreen()
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
          if (!finished) {
            setFinished(true)
            stepFinish()
          }
          break
        default:
          setGameStep('start')
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
    setSelectedCard(null)
    setRaundInfo(defaultRaundInfo) // обнулить переменные раунда
    setIsStartGame(false)
  }

  function buttonMenu(ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement | null, str: string, imageX: number, imageY: number, imageWidth: number, imageHeight: number) {
    if (!ctx) {
      return
    }
    if (!canvas) {
      return
    }
    ctx.save()
    ctx.fillStyle = 'red'
    ctx.fill(new Path2D(roundedRectPath(imageX, imageY, imageWidth, imageHeight, 30)))
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
      (event: MouseEvent) => {
        const isClickedInsideImage = event.offsetX >= imageX && event.offsetX <= imageX + imageWidth && event.offsetY >= imageY && event.offsetY <= imageY + imageHeight

        if (isClickedInsideImage) {
          setVisibleField(!visibleField)
        }
      },
      false
    )
  }
  function buttonModal(ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement | null, str: string, imageX: number, imageY: number, imageWidth: number, imageHeight: number) {
    if (!ctx) {
      return
    }
    if (!canvas) {
      return
    }
    ctx.save()
    ctx.fillStyle = 'blue'
    ctx.fill(new Path2D(roundedRectPath(imageX, imageY, imageWidth, imageHeight, 10)))
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
      (event: MouseEvent) => {
        const isClickedInsideImage = event.offsetX >= imageX && event.offsetX <= imageX + imageWidth && event.offsetY >= imageY && event.offsetY <= imageY + imageHeight

        if (isClickedInsideImage) {
          showModal()
        }
      },
      false
    )
  }

  /** Вешаем слушатель события на карточки  */
  useEffect(() => {
    addClick(animateCards)
  }, [cardsElement])
  // -------------- РОУТИНГ
  useEffect(() => {
    if (!visibleField) {
      setAnimationField(false)
    }

    routerGame()
    let str = 'Игровое поле'
    if (visibleField) {
      str = 'Вернуться к игре'
    }
    if (isStartGame) {
      buttonMenu(ctx3, canvas3, str, gameSettings.CANVAS_WIDTH_PX - 175, 5, 170, 40)
    }
  }, [gameStep, visibleField, isStartGame])

  useEffect(() => {
    routerGame()
  }, [playersInfo])

  useEffect(() => {
    console.log('load page default')
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
        <Space style={inputContainer}>{gameStep == 'association' && <Input placeholder="Напишите ассоциацию" />}</Space>

        <Row className="w100">
          <Col span={8} offset={12}>
            <Button type="primary" onClick={toggleFullScreen}>
              <FullscreenOutlined rev={undefined} />
              {fullScreen ? <>Закрыть</> : <>Открыть</>} &nbsp;полноэкранный режим
            </Button>
          </Col>
          <Col span={3}>
            <Button type="primary" onClick={togglePlayMusic}>
              {playMusic ? <>Выключить</> : <>Включить</>} &nbsp; музыку
            </Button>
            {playMusic && (
              <div style={sliderVertical}>
                <Slider vertical defaultValue={musicSettings.MUSIC_INIT_VOLUME} onChange={setMusicVolume} />
              </div>
            )}
          </Col>
        </Row>

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
              border: '1px solid rgba(255,255,255,0.4)',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}></canvas>

          <canvas id="canvas2" className="layer layer2" width={gameSettings.CANVAS_WIDTH_PX} height={gameSettings.CANVAS_HEIGHT_PX}></canvas>
          <canvas id="canvas3" className="layer layer3" width={gameSettings.CANVAS_WIDTH_PX} height={gameSettings.CANVAS_HEIGHT_PX}></canvas>
        </div>
        <Row className="w100">
          <Col span={8} className="text-left">
            {isStartGame ? (
              <Button
                type="primary"
                onClick={() => {
                  setGameStep('start')
                }}>
                Перезапустить игру
              </Button>
            ) : (
              <></>
            )}
          </Col>
          <Col span={8}>
            {isStartGame ? (
              <>
                {visibleField ? (
                  <Button type="primary" onClick={ReturnToGame} className="success">
                    Вернуться к игре
                  </Button>
                ) : (
                  <>
                    <Button type="primary" onClick={setNextGameStep}>
                      Следующий шаг (для режима разработки)
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setGameStep('association')
                }}>
                Начать игру
              </Button>
            )}
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              onClick={() => {
                setGameStep('finish')
              }}>
              Финиш (тестовый)
            </Button>
          </Col>
        </Row>
        <Row className="w100 mb-footer"></Row>
      </div>
      <Modal title=" " open={isModalOpen} onOk={сloseModal} onCancel={сloseModal} footer={null}>
        {gameStep == 'start' && <WgameStepStart сloseModal={сloseModal} startSettingsSave={startSettingsSave} />}
      </Modal>
    </>
  )
}
