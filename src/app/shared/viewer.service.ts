import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  public viewer: any;

  // 默认飞到长沙区域
  private flyToDestination() {
    const camera = this.viewer.camera;

    // 中国区域
    camera.flyTo({
      destination: Cesium.Rectangle.fromDegrees(70, -10, 140, 80),
      duration: 0.5,
      complete: function () {
        // 长沙区域
        /*camera.flyTo({
          destination: Cesium.Rectangle.fromDegrees(112.895029, 28.198809, 112.982687, 28.256750),
          duration: 1.2
        });*/
      }
    });
  }

  initView(container) {
    this.viewer = new Cesium.Viewer(container, {
      animation: true,  // 左下角的动画窗口
      timeline: true,   // 底部的时间控制条
      fullscreenButton: true, // 右下角全屏按钮

      geocoder: true, // 地点定位搜索框（右上角第一个）
      homeButton: true,  // 回到默认位置（右上角第二个）
      sceneModePicker: true,  // 场景模式(2d, 3d)切换 （右上角第三个）
      baseLayerPicker: true,  // 图层影像切换（右上角第四个）
      navigationHelpButton: true,  // 帮助按钮（右上角最后一个）

      selectionIndicator: false,
      infoBox: false,

      shouldAnimate: true,    // 开启动画。注意进行漫游浏览时要开启动画

      // 在线地图 (arcgis)
      /*imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      })*/
      // 离线地图
      imageryProvider: new Cesium.createTileMapServiceImageryProvider({
        url: 'assets/tiles',
        fileExtension: 'jpg'
      })
    });

    // 隐藏左下角的logo
    this.viewer.cesiumWidget.creditContainer.style.display = 'none';

    // 此项可以优化CPU与GPU性能。
    // 需要GPU加速渲染时，使用: viewer.scene.requestRender()方法响应
    this.viewer.scene.requestRenderMode = true;

    // 设置地球的颜色为灰色
    this.viewer.scene.globe.baseColor = Cesium.Color.GRAY;

    // 关闭光照渲染
    this.viewer.scene.globe.enableLighting = false;

    // 关闭深度检测
    this.viewer.scene.globe.depthTestAgainstTerrain = false;

    this.flyToDestination();
  }
}
