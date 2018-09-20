import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNode } from '@angular/material/tree';
import { Observable, of as observableOf } from 'rxjs';
import { GroupModel } from '../../models/GroupModel';

export class UrlNode {
  displayName: string;
  icon?: string;
  requiredRank?: string;
  children?: UrlNode[];
  src?: string;
}

export class UrlFlatNode {
  public isNodeExpanded: boolean;

  constructor(
    public expandable: boolean,
    public displayName: string,
    public icon: string,
    public level: number,
    public src?: string) {
  }
}

const TREE_DATA: UrlNode[] = [
  {
    displayName: 'Strona startowa',
    icon: 'dashboard',
    src: '/dashboard'
  },
  {
    displayName: 'Zarządzaj grupami',
    icon: 'business',
    children: []
  },
  {
    displayName: 'Panel admistracyjny',
    icon: 'security',
    children: [
      {
        displayName: 'Konta',
        src: '/admin/accounts'
      },
      {
        displayName: 'Postacie',
        src: '/admin/characters'
      },
      {
        displayName: 'Grupy',
        src: '/admin/groups'
      },
      {
        displayName: 'Pojazdy',
        src: '/admin/vehicles'
      },
      {
        displayName: 'Kary',
        src: '/admin/penalties'
      },
      {
        displayName: 'Budynki',
        src: '/admin/buildings'
      },
      {
        displayName: 'Przedmioty',
        src: '/admin/items'
      }
    ]
  },
  {
    displayName: 'Zgłoszenia',
    icon: 'feedback ',
    src: '/tickets'
  },
  {
    displayName: 'Moje konto',
    icon: 'person',
    src: '/player/characters'
  }
];

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  treeControl: FlatTreeControl<UrlFlatNode>;
  treeFlattener: MatTreeFlattener<UrlNode, UrlFlatNode>;
  dataSource: MatTreeFlatDataSource<UrlNode, UrlFlatNode>;

  @Input() public groups: GroupModel[];

  constructor() {
  }

  transformer = (node: UrlNode, level: number) => {
    return new UrlFlatNode(
      node.children !== undefined,
      node.displayName,
      node.icon,
      level,
      node.src
    );
  };

  private _getLevel = (node: UrlFlatNode) => node.level;

  private _isExpandable = (node: UrlFlatNode) => node.expandable;

  private _getChildren = (node: UrlNode): Observable<UrlNode[]> => observableOf(node.children);

  ngOnInit() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<UrlFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.groups.forEach(group => {
      const element: UrlNode = {
        displayName: group.name,
        src: `/groupmanagement/${group.id}`
      };
      TREE_DATA[1].children.push(element);
    });

    this.dataSource.data = TREE_DATA;
  }

}
