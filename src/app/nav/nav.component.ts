import { Component, OnInit } from '@angular/core';

import {ViewerService} from "../shared/viewer.service";
import {DynamicProperty} from "../libs/DynamicProperty";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private viewerService: ViewerService) { }

  ngOnInit() {
  }

  drawLine() {
    let viewer = this.viewerService.viewer;

    let lineEntity = viewer.entities.add({
      polyline: {
        positions: new DynamicProperty([]),
        width: 8,
        material: Cesium.Color.RED
      }
    });
    let positions = lineEntity.polyline.positions.getValue();
    let minPoints = 2;  // 绘制直线所需的最少点
    let lastPointTemporary = false; // 是否是鼠标移动的最后一个点

    let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

    document.body.style.cursor = 'crosshair'; // 设置鼠标箭头为十字形

    // 左键点击添加点
    handler.setInputAction(function (e) {
      // 获取点击位置
      let cartesian = viewer.camera.pickEllipsoid(e.position);

      if (Cesium.defined(cartesian)) {
        viewer.scene.requestRender();

        if (lastPointTemporary) {
          positions.pop();	//删除鼠标最后移动的位置
        }

        positions.push(cartesian);
        lastPointTemporary = false;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 移动鼠标选择下一个点位置
    handler.setInputAction(function (e) {
      let ray = viewer.camera.getPickRay(e.endPosition);
      let cartesian = viewer.scene.globe.pick(ray, viewer.scene);

      if (Cesium.defined(cartesian)) {
        viewer.scene.requestRender();

        if (lastPointTemporary) {
          positions.pop();	// 删除前一个鼠标移动的位置
        }

        positions.push(cartesian);
        lastPointTemporary = true;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 右键完成
    handler.setInputAction(function (e) {
      document.body.style.cursor = 'default'; // 设置箭头为默认
      handler.destroy();  // 删除当前绘制handler
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
}
