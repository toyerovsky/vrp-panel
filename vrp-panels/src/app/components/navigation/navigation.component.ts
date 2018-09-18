import { GroupService } from './../../service/group.service';
import { AccountService } from './../../service/account.service';
import { Component, OnInit} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, of as observableOf } from 'rxjs';

export class UrlNode {
  displayName: string;
  icon?: string;
  requiredRank?: string;
  children?: UrlNode[];
  src?: string;
  more?: boolean;
}

export class UrlFlatNode {
  constructor(
    public expandable: boolean, public displayName: string, public icon: string, public level: number, public src?: string, public more?: boolean) { }
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
    more: true,
    children: [
      {
        displayName: 'Testowa grupa',
        src: '/groupmanagement/1'
      }
    ]
  },
  {
    displayName: 'Panel admistracyjny',
    icon: 'security',
    more: true,
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

  constructor(
    private _accountService: AccountService,
    private _groupService: GroupService
  ) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);

    this.treeControl = new FlatTreeControl<UrlFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = TREE_DATA;
  }
  transformer = (node: UrlNode, level: number) => {
    return new UrlFlatNode(!!node.children, node.displayName, node.icon, level, node.src, node.more);
  }

  private _getLevel = (node: UrlFlatNode) => node.level;

  private _isExpandable = (node: UrlFlatNode) => node.expandable;

  private _getChildren = (node: UrlNode): Observable<UrlNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: UrlFlatNode) => _nodeData.expandable;

  ngOnInit() {
  }
}
