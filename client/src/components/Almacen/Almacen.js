import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { urlGetExistenciaProducto, urlGetProducto } from "../../util/rutasAPI";
import $ from "jquery";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Almacen = (props) => {
  useEffect(() => {
    $(document).ready(function () {
      var table = $("#table-almacen").DataTable({
        bProcessing: true,
        ajax: {
          method: "GET",
          url: urlGetProducto,
          data: { operacion: "datos" },
          headers: {
            Authorization: localStorage.getItem("auth-token"),
          },
        },
        columns: [
          {
            data: "",
            searchable: false,
            render: function (value, date) {
              return value;
            },
          },
          {
            data: "Id_Producto",
            type: "string",
            visible: true,
            searchable: true,
          },
          {
            data: "Desc_Producto",
            type: "string",
            visible: true,
            searchable: true,
          },
          {
            data: "Fecha_Entrada",
            type: "date",
            visible: true,
            searchable: true,
            render: function (value) {
              if (value === null) return "";
              var dt = new Date(value);
              if (dt.getFullYear() === 9999) return "";
              return (
                dt.getDate() +
                "/" +
                (dt.getMonth() + 1) +
                "/" +
                dt.getFullYear()
              );
            },
          },
        ],
        columnDefs: [
          {
            targets: 0,
            data: null,
            searchable: false,
            defaultContent: "",
            createdCell: function (td, cellData, rowData, row, col) {
              if (cellData < 1) $(td).addClass("details-control");
            },
          },
        ],
        dom: "BRlfrtipRT",
        pageLength: 10,
        processing: true,
        serverSide: true,
        destroy: true,
        buttons: ["copy", "csv", "excel", "print"],
        language: {
          sProcessing:
            "<div class='loaderTable' style='display: block;width:50px;height:50px;margin:0 auto;'></div>",
          sLengthMenu: "Mostrar _MENU_ registros",
          sZeroRecords: "No se encontraron resultados",
          sEmptyTable: "Ningún dato disponible en esta tabla",
          sInfo:
            "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
          sInfoEmpty:
            "Mostrando registros del 0 al 0 de un total de 0 registros",
          sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
          sInfoPostFix: "",
          sSearch: "Buscar:",
          searchPlaceholder: "Filtro Universal...",
          sUrl: "",
          sInfoThousands: ",",
          sLoadingRecords:
            "<div class='loaderTable' style='display: block;width:50px;height:50px;margin:0 auto;'></div>",
          oPaginate: {
            sFirst: "Primero",
            sLast: "Último",
            sNext: "Siguiente",
            sPrevious: "Anterior",
          },
          oAria: {
            sSortAscending:
              ": Activar para ordenar la columna de manera ascendente",
            sSortDescending:
              ": Activar para ordenar la columna de manera descendente",
          },
        },
      });

      //////////////////////HABRIR TABLA DE DETALLES///////////////////////////////
      $("#table-almacen tbody").on("click", "td.details-control", function (e) {
        e.preventDefault();
        var tr = $(this).closest("tr");
        var row = table.row(tr);
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass("shown");
        } else {
          row
            .child(
              `<table id="${tr[0].cells[1].innerText}_table" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; className="table"">` +
                "<thead>" +
                "<tr>" +
                "<th>Id Almacen</th>" +
                "<th>Id Lote</th>" +
                "<th>Fecha Entrada</th>" +
                "<th>Fecha Vence</th>" +
                "<th>Saldo Existencia</th>" +
                `<th class='details-control sorting_disabled' disabled>              
                </th>` +
                "</tr>" +
                "</thead>" +
                "</table>"
            )
            .show();
          tr.addClass("shown");
          $(document).ready(function () {
            $(`#${tr[0].cells[1].innerText}_table`).DataTable({
              bProcessing: true,
              ajax: {
                method: "GET",
                url: urlGetExistenciaProducto,
                data: { id: tr[0].cells[1].innerText },
                headers: {
                  Authorization: localStorage.getItem("auth-token"),
                },
              },
              dom: "Bfrtip",
              pageLength: 10,
              destroy: true,
              buttons: [],
              columns: [
                {
                  data: "Id_Almacen",
                  type: "string",
                  visible: true,
                  searchable: true,
                },
                {
                  data: "Id_Lote",
                  type: "string",
                  visible: true,
                  searchable: true,
                },
                {
                  data: "Fecha_Entrada",
                  type: "date",
                  visible: true,
                  searchable: true,
                  render: function (value) {
                    if (value === null) return "";
                    var dt = new Date(value);
                    if (dt.getFullYear() === 9999) return "";
                    return (
                      dt.getDate() +
                      "/" +
                      (dt.getMonth() + 1) +
                      "/" +
                      dt.getFullYear()
                    );
                  },
                },
                {
                  data: "Fecha_Vence",
                  type: "date",
                  visible: true,
                  searchable: true,
                  render: function (value) {
                    if (value === null) return "";
                    var dt = new Date(value);
                    if (dt.getFullYear() === 9999) return "";
                    return (
                      dt.getDate() +
                      "/" +
                      (dt.getMonth() + 1) +
                      "/" +
                      dt.getFullYear()
                    );
                  },
                },
                {
                  data: "Saldo_Existencia",
                  type: "string",
                  visible: true,
                  searchable: true,
                },
                {
                  data: "",
                  searchable: false,
                },
              ],
              columnDefs: [
                {
                  targets: -1,
                  data: null,
                  searchable: false,
                  defaultContent: "",
                  createdCell: function (td, cellData, rowData, row, col) {
                    function formatoFecha(value) {
                      if (value === null) return "";
                      var dt = new Date(value);
                      if (dt.getFullYear() === 9999) return "";
                      return (
                        dt.getDate() +
                        "/" +
                        (dt.getMonth() + 1) +
                        "/" +
                        dt.getFullYear()
                      );
                    }
                    if (cellData < 1) {
                      $(td).addClass("details-control");
                      $(td).addClass(`myBtn${rowData.Id_Producto.trim()}`);
                      $(td).addClass(`myBtn${rowData.Id_Producto.trim()}`);
                      $(td).html(`
                    <div id="myModal${rowData.Id_Producto.trim()}" class="modal myModal${rowData.Id_Producto.trim()}">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h2>${tr[0].cells[2].innerText.trim()} con ID: ${rowData.Id_Producto.trim()} en Almacen: ${
                        rowData.Id_Almacen
                      }</h2>
                            <span class="close close_${rowData.Id_Producto.trim()}">×</span>
                        </div>
                        <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Filtrar campo..." />
                        <table id="myTable" class="myTable myTable${rowData.Id_Producto.trim()}">
                          <tbody><tr className="header">
                              <th style={{width: '60%'}}>Campo</th>
                              <th style={{width: '40%'}}>Valor</th>
                            </tr>
                            <tr>
                              <td>Id de Lote</td>
                              <td>${rowData.Id_Lote}</td>
                            </tr>
                            <tr>
                              <td>Referencia</td>
                              <td>${rowData.Referencia}</td>
                            </tr>
                            <tr>
                              <td>Fecha de Entrada</td>
                              <td>${formatoFecha(rowData.Fecha_Entrada)}</td>
                            </tr>
                            <tr>
                              <td>Fecha de Vencimiento</td>
                              <td>${formatoFecha(rowData.Fecha_Vence)}</td>
                            </tr>
                            <tr>
                              <td>Saldo en Existencia</td>
                              <td>${rowData.Saldo_Existencia}</td>
                            </tr>
                            <tr>
                              <td>Reservadas</td>
                              <td>${rowData.Reservadas}</td>
                            </tr>
                            <tr>
                              <td>Disponibles</td>
                              <td>${rowData.Disponibles}</td>
                            </tr>
                            <tr>
                              <td>Sección</td>
                              <td>${rowData.Seccion}</td>
                            </tr>
                            <tr>
                              <td>Estante</td>
                              <td>${rowData.Estante}</td>
                            </tr>
                            <tr>
                              <td>Casilla</td>
                              <td>${rowData.Casilla}</td>
                            </tr>
                            <tr>
                              <td>Precio del CostoMB</td>
                              <td>${rowData.Precio_CostoMB}</td>
                            </tr>
                            <tr>
                              <td>Precio del CostoMC</td>
                              <td>${rowData.Precio_CostoMC}</td>
                            </tr>
                            <tr>
                              <td>Costo de ArancelMB</td>
                              <td>${rowData.Costo_ArancelMB}</td>
                            </tr>
                            <tr>
                              <td>Costo de ArancelMC</td>
                              <td>${rowData.Costo_ArancelMC}</td>
                            </tr>
                            <tr>
                              <td>ImporteMB</td>
                              <td>${rowData.ImporteMB}</td>
                            </tr>
                            <tr>
                              <td>ImporteMC</td>
                              <td>${rowData.ImporteMC}</td>
                            </tr>
                            <tr>
                              <td>Fecha de Inicio</td>
                              <td>${formatoFecha(rowData.Fecha_Inicio)}</td>
                            </tr>
                            <tr>
                              <td>Existencia en Inicio</td>
                              <td>${rowData.Existencia_Inicio}</td>
                            </tr>
                            <tr>
                              <td>Precio de InicioMC</td>
                              <td>${rowData.Precio_InicioMC}</td>
                            </tr>
                            <tr>
                              <td>Precio de InicioMB</td>
                              <td>${rowData.Precio_InicioMB}</td>
                            </tr>
                            <tr>
                              <td>Importe de InicioMB</td>
                              <td>${rowData.Importe_InicioMB}</td>
                            </tr>
                            <tr>
                              <td>Importe de InicioMC</td>
                              <td>${rowData.Importe_InicioMC}</td>
                            </tr>
                            <tr>
                              <td>Zona</td>
                              <td>${rowData.Zona}</td>
                            </tr>
                            <tr>
                              <td>Conteo</td>
                              <td>${rowData.Conteo}</td>
                            </tr>
                            <tr>
                              <td>Fecha de Conteo</td>
                              <td>${formatoFecha(rowData.Fecha_Conteo)}</td>
                            </tr>
                            <tr>
                              <td>Marca</td>
                              <td>${rowData.Marca}</td>
                            </tr>
                            <tr>
                              <td>Fecha último Mov</td>
                              <td>${formatoFecha(rowData.Fecha_LastMov)}</td>
                            </tr>
                            <tr>
                              <td>Documento</td>
                              <td>${rowData.Documto}</td>
                            </tr>
                            <tr>
                              <td>Estado</td>
                              <td>${rowData.Estado}</td>
                            </tr>
                            <tr>
                              <td>Empaque</td>
                              <td>${rowData.Empaque}</td>
                            </tr>
                            <tr>
                              <td>Empaque Inicio</td>
                              <td>${rowData.Empaque_Inicio}</td>
                            </tr>
                            <tr>
                              <td>InvFisico</td>
                              <td>${rowData.InvFisico}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      </div>
                      </div>
                    </div>
                    `);
                    }

                    $(document).ready(function () {
                      var modal = document.querySelector(
                        `.myModal${rowData.Id_Producto.trim()}`
                      );
                      var btn = document.querySelector(
                        `.myBtn${rowData.Id_Producto.trim()}`
                      );
                      var span = document.querySelector(
                        `.close_${rowData.Id_Producto.trim()}`
                      );
                      btn.onclick = () => (modal.style.display = "block");
                      span.onclick = () => {
                        modal.style.display = "none";
                      };
                    });
                  },
                },
              ],
              language: {
                sProcessing:
                  "<div class='loaderTable' style='display: block;width:50px;height:50px;margin:0 auto;'></div>",
                sLengthMenu: "Mostrar _MENU_ registros",
                sZeroRecords: "No se encontraron resultados",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo:
                  "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoEmpty:
                  "Mostrando registros del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sSearch: "Buscar:",
                searchPlaceholder: "Filtro...",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords:
                  "<div class='loaderTable' style='display: block;width:50px;height:50px;margin:0 auto;'></div>",
                oPaginate: {
                  sFirst: "Primero",
                  sLast: "Último",
                  sNext: ">",
                  sPrevious: "<",
                },
                oAria: {
                  sSortAscending:
                    ": Activar para ordenar la columna de manera ascendente",
                  sSortDescending:
                    ": Activar para ordenar la columna de manera descendente",
                },
              },
            });
          });
        }
      });
    });
  }, []);

  return (
    <>
      <Breadcrumb text="Productos en existencia" />
      <div className="contentArea">
        <table id="table-almacen" className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="details-control sorting_disabled" disabled></th>
              <th>Id Producto</th>
              <th>Nomber del Producto</th>
              <th>Fecha de Entrada</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default Almacen;
