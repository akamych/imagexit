import { Input, Space, Button, Slider, Row, Col, Modal } from 'antd'
import { UseDrawField } from '../../../hooks/useDrawField'
import { UseDrawPlayers } from '../../../hooks/useDrawPlayers'
import { UseInitCanvas } from '../../../hooks/useInitCanvas'
import { UseInitImage } from '../../../hooks/useInitImage'
import { UseDrawCards } from '../../../hooks/useDrawCards'
import { UseHandler } from '../../../hooks/useHandler'
import { UseGameCore } from '../../../hooks/useGameCore'
import { useEffect, useState } from 'react'
import { inputContainer, actionContainer, sliderVertical, sliderVerticalContainer, input } from '../../../assets/pageGameStyle'
import { UseMusic } from '../../../hooks/useMusic'
import { musicSettings } from '../../../constants/common'
import { UseDrawContent } from '../../../hooks/useDrawContent'
import { associations, getApiPlayersInfo, getApiRaundInfo, getPlayersJSON } from '../../../components/game/testData'
import { buttonCanvas, roundedRectPath, writeLogin, writeLoginFinish } from '../../../components/game/lib'
import { gameContent, gameSettings, typographySettings, MAX_ROUND_SCORE, stepsInTheGame } from '../../../constants/game'
import './game.css'
import { FullscreenOutlined } from '@ant-design/icons'
import { WgameStepStart } from '../../../components/game/WgameStepStart'
import { IPlayerInfo, defaultRaundInfo, IRaundInfo, IRaundPlayerInfo } from '../../../types/game'
import { useSetScore } from '../../../hooks/useSetScore'
import { randomInteger } from '../../../helpers/number'

export const PageGame = () => {
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
    setPlayersInfo,
    playersInfo,
    raundInfo,
    setRaundInfo,
    difficulty,
    setDifficulty,
    association,
    setAssociation,
  } = UseGameCore()

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
    const selectedCardIndex = cardsElement.findIndex(card => card.id === raundInfo.mastercardId)

    generatePlayers(playersInfo, selectedCardIndex, playersInfo[0].userId)
    writeTitle('Игровое поле')
    const { playerJSON, pointsJSON } = getPlayersJSON(7) // тестовые данные
    writeLogin(ctx, playerJSON, 20, gameSettings.GAME_BOARD_TOP_PX + 80)
  }
  // ====================== START
  const stepStart = () => {
    setIsStartGame(false)
    const left = gameSettings.CONTENT_LEFT_PX
    writeTitle(gameContent[gameStep].title)
    writeTask(gameContent[gameStep].task)
    writeSrting('Уровень сложности: ' + difficulty, typographySettings.smallText.color, left, gameSettings.GAME_BOARD_TOP_PX + 40)
    writeSrting('Команда: (от 3 до 7)', typographySettings.smallText.color, left, gameSettings.GAME_BOARD_TOP_PX + 70)
    writeLogin(ctx, playersInfo, left + 30, gameSettings.GAME_BOARD_TOP_PX + 100)
    buttonModal(ctx3, canvas3, 'Выбрать', gameSettings.CONTENT_WIDTH_PX, gameSettings.GAME_BOARD_TOP_PX + 40, 170, 40)

    setTimeout(() => {
      if (difficulty != null && playersInfo.length > 2 && playersInfo.length <= 7) {
        buttonCanvas(ctx3, canvas3, 'red', 'играть', '#fff', typographySettings.title.offset.left, gameSettings.GAME_BOARD_TOP_PX + 320, 170, 40, () => {
          setGameStep('association')
        })
      }
    }, 100)

    setFinished(false)

    setRaundInfo({
      id: 1,
      masterUserId: 'self',
      masterAssociation: 'Приятная суета',
      mastercardId: 0,
      players: playersInfo.map(i => {
        return {
          color: i.color,
          userId: i.userId,
          selectedCard: i.selectedImageIndex,
          master: false,
          pointsOld: i.score > 0 ? i.score - i.scoreAdd : 0,
          pointsAdd: i.scoreAdd,
        } as IRaundPlayerInfo
      }),
    })
  }
  // ---- будет сохраняться в глобальном стейте
  const startSettingsSave = (team: IPlayerInfo[], difficultyInput: string) => {
    setPlayersInfo(team)
    setDifficulty(difficultyInput)
    ClearScreen()
    // routerGame()
  }
  // ===============================
  const stepAssociation = () => {
    setIsStartGame(true)
    if (raundInfo.masterUserId === 'self') {
      drawCards()
    } else {
      setSelectedCard(cardsElement[randomInteger(0, 5)])
      setAssociation(associations[randomInteger(0, 40)])
    }

    displayContent(gameStep, raundInfo.masterUserId === 'self', raundInfo.id)
    setFinished(false)
  }

  useEffect(() => {
    if (raundInfo.masterUserId === 'self') {
      setRaundInfo(prev => ({ ...prev, mastercardId: selectedCard?.id ?? 0 }))
    } else {
      const players = raundInfo.players.map(p => {
        if (p.userId === 'self') {
          p.selectedCard = selectedCard?.id ?? 0
        }
        return p
      })

      setRaundInfo(prev => ({ ...prev, players }))
    }

    if (gameStep === 'association' && association.length > 0 && selectedCard && raundInfo.masterUserId === 'self') {
      buttonCanvas(ctx3, canvas3, 'red', 'Далее', '#fff', typographySettings.title.offset.left + 40, gameSettings.CANVAS_HEIGHT_PX - 45, 170, 40, () => {
        setGameStep('cards')
      })
    }

    if (gameStep === 'cards' && selectedCard && raundInfo.masterUserId !== 'self') {
      setTimeout(() => {
        buttonCanvas(ctx3, canvas3, 'red', 'Далее', '#fff', typographySettings.title.offset.left + 40, gameSettings.CANVAS_HEIGHT_PX - 45, 170, 40, () => {
          setGameStep('scoring')
        })
      }, 2000)
    }
  }, [selectedCard, association, gameStep])

  const stepCards = () => {
    if (raundInfo.masterUserId !== 'self') {
      writeText('Ассоциация ведущего:' + association, gameSettings.CARD_TOP_PX - 60)
      drawCards()
    }
    displayContent(gameStep, raundInfo.masterUserId === 'self', raundInfo.id)
  }

  const stepScoring = () => {
    displayContent(gameStep, raundInfo.masterUserId === 'self', raundInfo.id)
    writeText('Карточка ведущего', gameSettings.CARD_TOP_PX - 40)
    const selectedCardLocal = cardsElement.find(c => c.id === raundInfo.mastercardId)
    selectedCardLocal && drawCard(selectedCardLocal.img, gameSettings.CONTENT_LEFT_PX + gameSettings.CARD_LEFT_PX, gameSettings.CARD_TOP_PX)

    let dx = gameSettings.CONTENT_LEFT_PX + gameSettings.CARD_LEFT_PX

    const selectedCardIndex = cardsElement.findIndex(card => card.img === selectedCardLocal?.img)

    const onlyPlayers = playersInfo.filter(p => p.userId !== raundInfo.masterUserId)

    onlyPlayers.forEach(player => {
      if (player.selectedImageIndex === selectedCardIndex) {
        player.score += 3
        player.scoreAdd = 3
      } else {
        player.score += 1
        player.scoreAdd = 1
      }
      writeText(player.login, 460, dx - gameSettings.CONTENT_LEFT_PX - gameSettings.CARD_LEFT_PX)

      if (typeof player.selectedImageIndex === 'number') {
        drawCard(cardsElement[player.selectedImageIndex].img, dx, 500)
      }

      dx += gameSettings.CARD_WIDTH_PX + 10
    })

    const masterUser = playersInfo.find(p => p.userId === raundInfo.masterUserId)

    if (!masterUser) {
      return
    }

    if (raundInfo.masterUserId === 'self') {
      if (onlyPlayers.every(i => i.selectedImageIndex === selectedCardIndex) || onlyPlayers.every(i => i.selectedImageIndex !== selectedCardIndex)) {
        masterUser.score += 0
        masterUser.scoreAdd = 0
      } else {
        masterUser.score += 3
        masterUser.scoreAdd = 3
      }
    } else {
      if (masterUser.selectedImageIndex === selectedCardIndex) {
        masterUser.score += 3
        masterUser.scoreAdd = 3
      } else {
        masterUser.score += 1
        masterUser.scoreAdd = 1
      }
    }
    buttonCanvas(ctx3, canvas3, 'red', 'Далее', '#fff', typographySettings.title.offset.left + 40, gameSettings.CANVAS_HEIGHT_PX - 45, 170, 40, () => {
      setGameStep('results')
    })
  }
  const stepResults = () => {
    setAnimationField(true)
    setPlace()
    const selectedCardIndex = cardsElement.findIndex(card => card.img === selectedCard?.img)
    generatePlayers(playersInfo, selectedCardIndex, playersInfo[0].userId)
    displayContent(gameStep, raundInfo.masterUserId === 'self', raundInfo.id)
    writeTitle(gameContent[gameStep].title)
    writeTask(gameContent[gameStep].task)
    writeLogin(ctx, playersInfo, 20, gameSettings.GAME_BOARD_TOP_PX + 80)

    if (playersInfo.find(i => i.score >= 25)) {
      setGameStep('finish')
    } else {
      buttonCanvas(ctx3, canvas3, 'red', 'Следующий раунд', '#fff', typographySettings.title.offset.left - 240, gameSettings.CANVAS_HEIGHT_PX - 45, 170, 40, () => {
        setGameStep('association')
        const masterUserIndex = playersInfo.findIndex(p => p.userId === raundInfo.masterUserId)

        const nextMasterUserID = masterUserIndex === playersInfo.length - 1 ? playersInfo[0].userId : playersInfo[masterUserIndex + 1].userId

        setRaundInfo(prev => ({
          ...prev,
          id: prev.id + 1,
          masterUserId: nextMasterUserID,
        }))
        setSelectedCard(null)
        setAssociation('')
      })
    }
  }

  const stepFinish = () => {
    setAnimationField(false)
    setIsStartGame(false)
    writeTitle('Финал')
    writeLoginFinish(ctx, playersInfo, raundInfo, gameSettings.CANVAS_WIDTH_PX / 2 - 80, gameSettings.GAME_BOARD_TOP_PX)
    buttonCanvas(ctx3, canvas3, 'yellow', 'Еще партейку, пожалуй', '#000', gameSettings.CANVAS_WIDTH_PX / 2 - 100, gameSettings.CANVAS_HEIGHT_PX - 200, 200, 40, ReturnToGame)

    updateScore(Math.floor(Math.random() * (MAX_ROUND_SCORE + 1)))
  }

  // ===================== Steps ROUTER
  const routerGame = () => {
    console.log(playersInfo, raundInfo)
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
  }, [playersInfo, gameStep])

  useEffect(() => {
    // routerGame()
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
          <Space style={inputContainer}>
            {gameStep == 'association' && raundInfo.masterUserId === 'self' && (
              <Input
                style={input}
                disabled={!selectedCard}
                placeholder="Напишите ассоциацию"
                value={association}
                onChange={e => {
                  setAssociation(e.target.value)
                }}
              />
            )}
          </Space>
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
                    <Button
                      type="primary"
                      onClick={() => {
                        setGameStep(stepsInTheGame[stepsInTheGame.indexOf(gameStep) + 1])
                      }}>
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
