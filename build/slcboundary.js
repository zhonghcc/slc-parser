"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlcVertex = exports.SlcBoundary = void 0;

class SlcBoundary {
  constructor(nums, gaps, list) {
    this.nums = nums;
    this.gaps = gaps;
    this.outer = true;
    this.list = [];
    this.xxyy = [];
  }

  addVertex(vertex) {
    this.list.push(vertex);
  }

  box() {
    let first = this.list[0];
    this.xxyy = [first.x, first.x, first.y, first.y];

    for (let i = 0; i < this.list.length; i++) {
      let cur = this.list[i];
      let x = cur.x;
      let y = cur.y;

      if (x < this.xxyy[0]) {
        this.xxyy[0] = x;
      }

      if (x > this.xxyy[1]) {
        this.xxyy[1] = x;
      }

      if (y < this.xxyy[2]) {
        this.xxyy[2] = y;
      }

      if (y > this.xxyy[3]) {
        this.xxyy[3] = y;
      }
    }
  }

  adjustOuter() {
    //get rightmost point
    let index = 0;
    let right = this.list[index];
    let max = right.x;

    for (let i = 0; i < this.list.length; i++) {
      let cur = this.list[i];
      let x = cur.x;
      let y = cur.y;

      if (x > max) {
        right = cur;
        max = x;
        index = i;
      }
    }

    let p1 = this.list[index == 0 ? this.list.length - 1 : index - 1];
    let p2 = this.list[index];
    let p3 = this.list[index == this.list.length - 1 ? 0 : index + 1];
    let v1 = [p2.x - p1.x, p2.y - p1.y];
    let v2 = [p3.x - p2.x, p3.y - p2.y];
    let z = v1[0] * v2[1] - v1[1] * v2[0]; // console.log("boundary z ",z);

    this.outer = z > 0;
  }

}

exports.SlcBoundary = SlcBoundary;

class SlcVertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

}

exports.SlcVertex = SlcVertex;