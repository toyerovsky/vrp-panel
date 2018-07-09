import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, of as observableOf } from 'rxjs';

export class UrlNode {
  displayName: string;
  children?: UrlNode[];
  src?: string;
}

export class UrlFlatNode {
  constructor(
    public expandable: boolean, public displayName: string, public level: number) { }
}

const TREE_DATA: UrlNode[] = [
  {
    displayName: 'Rozgrywka',
    children: [
      {
        displayName: 'Postacie',
      },
      {
        displayName: 'Grupy',
      }
    ]
  }
];

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  treeControl: FlatTreeControl<UrlFlatNode>;
  treeFlattener: MatTreeFlattener<UrlNode, UrlFlatNode>;
  dataSource: MatTreeFlatDataSource<UrlNode, UrlFlatNode>;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);

    this.treeControl = new FlatTreeControl<UrlFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = TREE_DATA;
  }
  transformer = (node: UrlNode, level: number) => {
    return new UrlFlatNode(!!node.children, node.displayName, level);
  }

  private _getLevel = (node: UrlFlatNode) => node.level;

  private _isExpandable = (node: UrlFlatNode) => node.expandable;

  private _getChildren = (node: UrlNode): Observable<UrlNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: UrlFlatNode) => _nodeData.expandable;

  ngOnInit() {
  }
}
