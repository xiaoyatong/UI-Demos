import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Image } from "@tarojs/components";
import { usePullDownRefresh, useRouter } from "@tarojs/taro";
import arrow from "@/assets/arrow.png";
import "./index.scss";
import {
  Button,
  ConfigProvider,
  Input,
  Picker,
  TextArea,
  Uploader,
} from "@nutui/nutui-react-taro";
import { FileItem } from "@nutui/nutui-react-taro/dist/types/packages/uploader/file-item";
import { PickerOption } from "@nutui/nutui-react-taro/dist/types/packages/picker";
import Taro from "@tarojs/taro";
import {
  change,
  handleImageChange,
  synchronizationImage,
} from "@/src/utils/common";
import {
  CarInfo,
  RentorderV2,
  ServicePeopleInfo,
} from "@/src/servers/api.driver";
import {
  getCarinventory,
  getEditRentOrder,
  getRentOrder,
} from "@/src/servers/servers.driver";
import { set } from "lodash";
import dayjs from "dayjs";
const datePickerDarkTheme = {
  nutuiBrandColor: "#498ff2",
  nutuiBrandColorEnd: "#4965f2",
  nutuiCalendarChooseBackgroundColor: "#d7edfa",
};
const Index = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<ServicePeopleInfo>(
    Taro.getStorageSync("userInfo")
  );
  const [dataSource, setDataSource] = useState<RentorderV2>();
  const [carinventoryItem, setCarinventoryItem] = useState<CarInfo>();
  const [kilometreNumber, setKilometreNumber] = useState<string>("");
  const [oilGridItem, setOilGridItem] = useState<any>();

  const router = useRouter();
  const { order_guid } = router.params;
  const uploadUrl = "";
  const [damageValue, setDamageValue] = useState("");
  const [dashboardFileList, setDashboardFileList] = useState<any>([]);
  const [handoverFileList, setHandoverFileList] = useState<any>([]);
  const [licensePlateFileList, setLicensePlateFileList] = useState<any>([]);
  const [inspectFileList, setInspectFileList] = useState<any>([]);
  const [visibleOilQuantity, setVisibleOilQuantity] = useState(false);
  const [borrowVideo, setBorrowVideo] = useState<any>({});
  useEffect(() => {
    setUserInfo(Taro.getStorageSync("userInfo"));
    // car_guid 车型guid
    rentOrderDataSource(order_guid).then((res) => {
      const ress: any = res;
      getCarinventoryInfo(ress?.data[0]?.car_inventory_guid);
    });
  }, []);
  usePullDownRefresh(() => {
    rentOrderDataSource(order_guid).then((res) => {
      const ress: any = res;
      getCarinventoryInfo(ress?.data[0]?.car_inventory_guid).then(() => {
        //下拉刷新
        Taro.stopPullDownRefresh();
        // eslint-disable-next-line no-restricted-globals
      });
    });
  });
  const getCarinventoryInfo = (car_guid: string | undefined) => {
    return new Promise((resolve) => {
      //const sql = `_where=(car_guid,eq,${car_guid})~and(state,eq,1)&_assign=(car_server_type,2)`
      const sql = `_where=(car_inventory_guid,eq,${car_guid})`;
      getCarinventory(sql).then((res) => {
        if (res && res?.data?.errmsg && res?.data?.errmsg !== "success") {
          Taro.showToast({
            title: res?.data?.errmsg,
            icon: "none",
            duration: 2000,
          });
        } else {
          const item = res?.data[0];
          setCarinventoryItem(item);
          setKilometreNumber(item?.car_kilometre);
          //构造油量
          const oilGridItemChange: any = [].concat(oilGridList(item))[
            item?.oil_mass
          ];
          console.log(oilGridItemChange, "<===oilGridItemChange");
          setOilGridItem(oilGridItemChange);
        }
      });
      return resolve({});
    });
  };
  // 获取租车订单详情
  const rentOrderDataSource = async (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    order_guid: string | undefined,
    loading = true
  ) => {
    const sql = `_where=(order_guid,eq,${order_guid})`;
    return new Promise(async (resolve) => {
      await getRentOrder(sql, loading).then((res) => {
        if (res && res?.data?.errmsg && res?.data?.errmsg !== "success") {
          Taro.showToast({
            title: res?.data?.errmsg,
            icon: "none",
            duration: 2000,
          });
        } else {
          if (res?.data?.length > 0) {
            const data = res?.data[0];
            setDataSource(data);
            return resolve(res);
          } else {
            Taro.showToast({
              title: "暂无数据",
              icon: "none",
              duration: 2000,
            });
          }
        }
        return resolve(res);
      });
    });
  };
  //油量体现方式构造
  const oilGridList = (carItem: CarInfo) => {
    const oilList: any = [];
    for (let num = 0; num <= Number(carItem?.oil_grid); num++) {
      oilList.push({ value: num, text: `${num}/${Number(carItem?.oil_grid)}` });
    }
    return oilList;
  };

  const confirmPicker = (
    options: PickerOption[],
    values: (string | number)[]
  ) => {
    setOilGridItem(options[0]);
  };
  const onChangeInspect = (res) => {
    const mapList = res.map((item) => {
      return {
        name: "环检照片",
        url: item?.path,
        path: item?.path,
        status: "success",
        message: "上传成功",
        type: "image",
      };
    });
    setInspectFileList(mapList);
  };
  const onChangeDashboard = (res) => {
    const mapList = res.map((item) => {
      return {
        name: "仪表盘照片",
        url: item?.path,
        path: item?.path,
        status: "success",
        message: "上传成功",
        type: "image",
      };
    });
    setDashboardFileList(mapList);
  };
  const onChangeHandover = (res) => {
    console.log("onChange 触发", res);
    if (res[0] && res[0].url) {
      const mapList = res.map((item) => {
        return {
          name: "取车视频",
          url: item?.url,
          pathUrl: item?.path,
          path: item?.path,
          status: "success",
          message: "上传成功",
          type: "image",
        };
      });
      setHandoverFileList(mapList);
    }
  };
  const onChangeLicensePlate = (res) => {
    const mapList = res.map((item) => {
      return {
        name: "车牌照片",
        url: item?.path,
        path: item?.path,
        status: "success",
        message: "上传成功",
        type: "image",
      };
    });
    setLicensePlateFileList(mapList);
  };
  const uploadDashboardRef = useRef(null);
  const uploadHandoverRef = useRef(null);
  const uploadLicensePlateRef = useRef(null);
  const uploadInspectRef = useRef(null);
  const clearUpload = (uploadRef) => {
    uploadRef.current.clear();
  };
  const onDeleteInspect = (file, fileList) => {
    clearUpload(uploadInspectRef);
    setInspectFileList(fileList);
  };
  const onDeleteLicensePlate = (file, fileList) => {
    clearUpload(uploadLicensePlateRef);
    setLicensePlateFileList(fileList);
  };
  const onDeleteDashboard = (file, fileList) => {
    clearUpload(uploadDashboardRef);
    setDashboardFileList(fileList);
  };
  const onDeleteHandover = (file, fileList) => {
    clearUpload(uploadHandoverRef);
    setHandoverFileList(fileList);
  };
  //图片预览
  const previewImage = (file, fileList) => {
    Taro.previewImage({
      current: file.path, // 当前显示图片的http链接
      urls: fileList.map((item) => {
        return item.path;
      }), // 需要预览的图片http链接列表
      success: async () => {},
      complete: (res) => {},
      fail: (res) => {},
    });
  };
  const onFileDashboardItemClick = (file: FileItem, index: number) => {
    previewImage(file, dashboardFileList);
  };
  //视频预览
  const onFileHandoverItemClick = async (file: FileItem, index: number) => {
    alert(JSON.stringify(file));
    const imageChangeData = {
      borrow_video: change(file?.path),
    };
    const cdnInfo: any = await handleImageChange(imageChangeData, false);
    setBorrowVideo(cdnInfo);
    Taro.previewMedia({
      sources: [
        {
          url: cdnInfo.borrow_video,
          type: "video",
        },
      ], // 当前显示图片的http链接
      success: async () => {},
      complete: (res) => {},
      fail: (res) => {},
    });
  };
  const onFileLicensePlateItemClick = (file: FileItem, index: number) => {
    previewImage(file, licensePlateFileList);
  };
  const onFileInspectItemClick = (file: FileItem, index: number) => {
    previewImage(file, inspectFileList);
  };
  const uploadInformationSubmit = async () => {
    const showToastTitle: any = [];
    if (!carinventoryItem?.car_plate) {
      showToastTitle.push("取车车牌号");
    }
    if (!kilometreNumber) {
      if (kilometreNumber + "" != "0") {
        showToastTitle.push("取车公里数");
      }
    }
    if (!oilGridItem?.text) {
      showToastTitle.push("取车油量/电量");
    }
    if (!change(dashboardFileList[0])) {
      //提示信息
      showToastTitle.push("仪表盘照片");
    }
    if (!change(licensePlateFileList[0])) {
      //提示信息
      showToastTitle.push("车牌照片");
    }
    if (!change(inspectFileList[0])) {
      //提示信息
      showToastTitle.push("车辆环检照-用车前");
    }
    if (showToastTitle.length > 0) {
      //|| !vehicleStatus
      Taro.showModal({
        content:
          showToastTitle.length > 0
            ? `您需补全以下信息:${showToastTitle.toString()}`
            : "请您去确认车况信息",
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // console.log("用户点击确定");
          } else if (res.cancel) {
            // console.log("用户点击取消");
          }
        },
      });
    } else {
      Taro.showLoading({
        mask: true,
        title: "数据加载中",
      });
      let imageChangeData = {};
      let cdnInfo: any = {};
      if (borrowVideo?.borrow_video) {
        imageChangeData = {
          meter_image: change(dashboardFileList[0]?.path),
          borrow_car_image_array: change(licensePlateFileList[0]?.path),
        };
        const cdnInfoImage = await handleImageChange(imageChangeData, false);
        cdnInfo = {
          ...cdnInfoImage,
          ...borrowVideo,
        };
      } else {
        imageChangeData = {
          meter_image: change(dashboardFileList[0]?.path),
          borrow_car_image_array: change(licensePlateFileList[0]?.path),
          borrow_video: change(handoverFileList[0]?.path),
        };
        cdnInfo = await handleImageChange(imageChangeData, false);
      }

      //用车前照片
      const synchronizationImageList = await synchronizationImage(
        inspectFileList.map((item) => {
          return item.path;
        })
      );
      await editRentOrder({
        car_inventory_guid: carinventoryItem?.car_inventory_guid, //车辆guid
        vin: carinventoryItem?.vin, //车辆vin
        kilometre_number: kilometreNumber, //出车公里数
        oil_grid: carinventoryItem?.oil_grid, //油量格数
        oil_number: Number(oilGridItem.value), //  出车油量
        car_plate: carinventoryItem?.car_plate, //出借车车牌号
        //order_state: 4,
        serpractical_car_service_staff_guid: userInfo.service_staff_guid,
        serpractical_car_service_staff_name: userInfo.service_staff_name,
        serpractical_car_service_staff_phone: userInfo.service_staff_phone,
        before_use_environment_check_images: synchronizationImageList ?? [],
        //before_use_environment_check_image: cdnInfoPng?.imageMergeUrl ?? '',
        before_use_remark: damageValue, //请填写用车前备注说明
        ...cdnInfo,
        //	meter_image: cdnInfo.meter_image, //出车-仪表盘照
      }).then((res) => {
        Taro.hideLoading();
        if (res) {
          Taro.navigateBack({
            delta: 1,
          });
        }
      });
    }
  };
  // 编辑出车信息
  const editRentOrder = (data, loading = true) => {
    return new Promise((resolve) => {
      dataSource?.order_guid &&
        getEditRentOrder(dataSource?.order_guid, data, loading).then((res) => {
          if (res && res?.data?.errmsg && res?.data?.errmsg !== "success") {
            Taro.showToast({
              title: res?.data?.errmsg,
              icon: "none",
              duration: 2000,
            });
            return resolve(0);
          } else {
            return resolve(1);
          }
        });
    });
  };
  const loadMedia = (file) => {
    const dataUrl = URL.createObjectURL(file);
    const res = {
      tempFilePath: dataUrl,
      size: file.size,
      duration: 0,
      height: 0,
      width: 0,
      thumbTempFilePath: "",
      fileType: file.type,
      originalFileObj: file,
    };
    if (/^video\//.test(res.fileType)) {
      // Video
      const video = document.createElement("video");
      const reader = new FileReader();
      video.crossOrigin = "Anonymous";
      video.preload = "metadata";
      video.src = res.tempFilePath;
      return new Promise((resolve, reject) => {
        // 对齐旧版本实现
        reader.onload = (event) => {
          var _a;
          res.tempFilePath =
            (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
          resolve(res);
        };
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(res.originalFileObj);
        video.onloadedmetadata = () => {
          res.duration = video.duration;
          res.height = video.videoHeight;
          res.width = video.videoWidth;
          resolve(res);
        };
        video.oncanplay = () => {
          res.thumbTempFilePath = getThumbTempFilePath(
            video,
            res.height,
            res.width,
            0.8
          );
          resolve(res);
        };
        video.onerror = (e) => reject(e);
      });
    }
  };
  const getThumbTempFilePath = (
    el,
    height = 0,
    width = height,
    quality = 0.8
  ) => {
    const max = 256;
    const canvas = document.createElement("canvas");
    if (height > max || width > max) {
      const radio = height / width;
      if (radio > 1) {
        height = max;
        width = height / radio;
      } else {
        width = max;
        height = width * radio;
      }
    }
    canvas.height = height;
    canvas.width = width;
    const ctx = canvas.getContext("2d");
    ctx === null || ctx === void 0
      ? void 0
      : ctx.drawImage(el, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  };
  return (
    <View className="vehicleCollectionInformation">
      <View className="card-list none-margin-top">
        <View className="card-item card-item-title">
          <View>取车信息</View>
          <View className="card-item-details"></View>
        </View>
        <View className="card-item">
          <View className="card-item-left">预计取车时间</View>
          <View className="card-item-details custom-colors">
            {dataSource?.predict_draw_out_date
              ? dayjs(dataSource?.predict_draw_out_date).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "-"}
          </View>
        </View>
        <View className="card-item">
          <View className="card-item-left">实际取车时间</View>
          <View className="card-item-details custom-colors">
            {dataSource?.practical_draw_out_date
              ? dayjs(dataSource?.practical_draw_out_date).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "-"}
          </View>
        </View>
        <View className="card-item">
          <View className="card-item-left">取车车型</View>
          <View className="card-item-details custom-colors">
            {dataSource?.car_info_model ?? "-"}
          </View>
        </View>
        <View className="card-item">
          <View className="card-item-left">取车车牌</View>
          <View className="card-item-details custom-colors">
            {dataSource?.car_plate ?? "-"}
          </View>
        </View>
        <View className="card-item">
          <View className="card-item-left">取车公里数</View>
          <View className="card-item-details custom-colors">
            <Input
              value={kilometreNumber}
              onChange={(val) => setKilometreNumber(val)}
              className="card-item-input"
              align="right"
              type="digit"
              placeholder="请输入公里数"
            />
          </View>
        </View>
        <View className="card-item">
          <View className="card-item-left">取车油量/电量</View>
          <View
            className={`card-item-details ${
              oilGridItem?.text
                ? "custom-colors44-104-255-1"
                : "custom-colors-0-0-0-025"
            }`}
            onClick={() => {
              setVisibleOilQuantity(true);
            }}
          >
            <View>{oilGridItem?.text ?? "请选择"}</View>
            <Image className="nar-icon" src={arrow}></Image>
          </View>
        </View>
      </View>
      <View className="card-list">
        <View className="card-item card-item-title">
          <View>仪表盘照</View>
          <View className="card-item-details"></View>
        </View>
        <View className="media-list">
          <Uploader
            multiple={true}
            mediaType={["image"]}
            ref={uploadDashboardRef}
            url={uploadUrl}
            value={dashboardFileList}
            onDelete={onDeleteDashboard}
            onChange={onChangeDashboard}
            onFileItemClick={onFileDashboardItemClick}
          />
        </View>
      </View>

      <View className="card-list">
        <View className="card-item card-item-title">
          <View>取车交车视频（非必填）</View>
          <View className="card-item-details"></View>
        </View>
        <View className="illustrate">
          拍摄并保留验车视频，可避免后期车损争议
        </View>
        <View className="media-list">
          <View
            id="mediaId"
            onClick={() => {
              const targetNode = document.querySelector("body");
              const observerOptions = {
                childList: true,
                attributes: true,
                subtree: true, // 子树中的所有节点
              };

              const observer = new MutationObserver(
                (mutationsList, observer) => {
                  for (let mutation of mutationsList) {
                    const videoUpload =
                      document.getElementById("taroChooseMedia");
                    if (videoUpload) {
                      //	console.log('====》videoUpload.', videoUpload)
                      videoUpload.addEventListener("change", function () {
                        var filec = videoUpload?.files[0];
                        console.log("===>", filec);
                        if (filec) {
                          //文件已经选择好 下面可以写自己的上传代码了
                          loadMedia(filec)?.then((res) => {
                            const ress: any = res;
                            console.log(ress, "<==loadMediares");
                            onChangeHandover([
                              {
                                path: ress?.thumbTempFilePath,
                                url: ress?.tempFilePath,
                              },
                            ]);
                          });
                        }
                      });
                    }
                  }
                }
              );

              targetNode && observer.observe(targetNode, observerOptions);
            }}
          >
            <Uploader
              multiple={true}
              mediaType={["video"]}
              ref={uploadHandoverRef}
              url={uploadUrl}
              value={handoverFileList}
              onDelete={onDeleteHandover}
              onChange={onChangeHandover}
              onFileItemClick={onFileHandoverItemClick}
            />
          </View>
        </View>
      </View>

      <View className="card-list">
        <View className="card-item card-item-title">
          <View>车牌照片上传</View>
          <View className="card-item-details"></View>
        </View>
        <View className="media-list">
          <Uploader
            multiple={true}
            mediaType={["image"]}
            ref={uploadLicensePlateRef}
            url={uploadUrl}
            value={licensePlateFileList}
            onDelete={onDeleteLicensePlate}
            onChange={onChangeLicensePlate}
            onFileItemClick={onFileLicensePlateItemClick}
          />
        </View>
      </View>

      <View className="card-list">
        <View className="card-item card-item-title">
          <View>车辆环检照-用车前</View>
          <View className="card-item-details"></View>
        </View>
        <View className="illustrate">车辆外观损伤、车辆验车照片</View>
        <View className="media-list">
          <Uploader
            multiple={true}
            mediaType={["image"]}
            ref={uploadInspectRef}
            maxCount={4}
            url={uploadUrl}
            value={inspectFileList}
            onDelete={onDeleteInspect}
            onChange={onChangeInspect}
            onFileItemClick={onFileInspectItemClick}
          />
        </View>
        <TextArea
          placeholder="请填写用车前备注说明"
          rows={5}
          autoSize
          className="nutui-text-area"
          onChange={(value) => setDamageValue(value)}
          value={damageValue}
        />
      </View>

      <View className="content-buttom-bg">
        <Button
          onClick={uploadInformationSubmit}
          className="content-buttom"
          type="info"
          size="large"
        >
          确认取车
        </Button>
      </View>
      <ConfigProvider theme={datePickerDarkTheme}>
        {oilGridItem?.text ? (
          <Picker
            visible={visibleOilQuantity}
            options={oilGridList(carinventoryItem)}
            defaultValue={[].concat([oilGridItem?.value])}
            title="油量选择"
            onConfirm={(list, values) => confirmPicker(list, values)}
            onClose={() => setVisibleOilQuantity(false)}
          />
        ) : null}
      </ConfigProvider>
    </View>
  );
};

export default Index;
