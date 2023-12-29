import { AddWater } from 'components/WaterModals/AddWater';
import sprite from '../../images/sprite.svg';
import {
  AddBtnStyle,
  DeleteBtn,
  EditBtn,
  ListItem,
  TextTime,
  TextVolume,
  TodayStyle,
  InfoWrap,
  WrapBtn,
  TodayStyledDiv,
  ListAddDiv,
  UlStyle,
} from './TodayList.styled';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  openAddWater,
  openDeleteWater,
  openEditWater,
} from 'redux/modals/modalsSlice';
import modalConstants from 'redux/modals/modalСonstants';
import { fetchTodayWater } from 'redux/water/operations';
import { selectTodayWater } from 'redux/water/selectors';
import { useEffect } from 'react';
import { DeleteWaterModal } from 'components/WaterModals/DeleteWaterModal';
import { WaterModal } from 'components/WaterModals/WaterModal';
import { EditWater } from 'components/WaterModals/EditWater';
import { selectModalType } from 'redux/modals/selectors';

export const TodayWaterList = () => {
  const isOpen = useSelector(selectModalType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodayWater());
  }, [dispatch]);

  const { waterNotes } = useSelector(selectTodayWater);

  const onEdit = water => {
    dispatch(openEditWater(water));
  };
  const onDelete = id => {
    dispatch(openDeleteWater({ _id: id }));
  };

  const timeFromDate = date => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TodayStyledDiv>
      <TodayStyle>Today</TodayStyle>
      <ListAddDiv>
        {waterNotes?.length > 0 ? (
          <UlStyle>
            {waterNotes.map(({ amountWater, date, _id }) => (
              <ListItem key={_id}>
                <InfoWrap>
                  <svg>
                    <use href={sprite + '#cup'}></use>
                  </svg>
                  <TextVolume>{amountWater} ml</TextVolume>
                  <TextTime>{timeFromDate(date)}</TextTime>
                </InfoWrap>
                <WrapBtn>
                  <EditBtn onClick={() => onEdit({ amountWater, date, _id })}>
                    <svg>
                      <use href={sprite + '#edit'}></use>
                    </svg>
                  </EditBtn>
                  <DeleteBtn onClick={() => onDelete(_id)}>
                    <svg>
                      <use href={sprite + '#trash'}></use>
                    </svg>
                  </DeleteBtn>
                </WrapBtn>
              </ListItem>
            ))}
          </UlStyle>
        ) : (
          <p>No records</p>
        )}
        <AddBtnStyle onClick={() => dispatch(openAddWater())}>
          <svg>
            <use href={sprite + '#plus'}></use>
          </svg>
          Add water
        </AddBtnStyle>
      </ListAddDiv>

      <WaterModal open={isOpen}>
        {isOpen === modalConstants.ADD_WATER && <AddWater />}
        {isOpen === modalConstants.DELETE_WATER && <DeleteWaterModal />}
        {isOpen === modalConstants.EDIT_WATER && <EditWater />}
      </WaterModal>
    </TodayStyledDiv>
  );
};
